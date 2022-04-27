import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router';
import messages from '../../translations/en.json';

import messagesSlice from '../messages/messagesSlice';
import applicationsSlice from '../applications/applicationsSlice';
import languageSlice from '../language/languageSlice';

import { verifyEmail } from '../../api/hatAPI';
import { AuthVerifyEmail } from './AuthVerifyEmail';
import { pdaLookupWithEmail } from '../../services/HattersService';
import authenticationSlice from './authenticationSlice';

jest.mock('../../api/hatAPI');
jest.mock('../../services/HattersService');

const mockVerifyEmail: jest.Mocked<any> = verifyEmail;
const mockPdaLookupWithEmail: jest.Mocked<any> = pdaLookupWithEmail;

export const defaultStore = configureStore({
  reducer: {
    messages: messagesSlice,
    applications: applicationsSlice,
    language: languageSlice,
    authentication: authenticationSlice,
  },
  preloadedState: {
    messages,
    applications: {
      applications: [],
    },
    language: {
      language: 'en',
    },
    authentication: {
      pdaLookupResponse: {
        verified: true,
        hatCluster: 'testHatCluster',
        hatName: 'testHatName',
      },
    },
  },
});

beforeEach(() => {
  jest.resetAllMocks();
});

const renderWithProviders = (ui: any, { route = '/', store = defaultStore } = {}) => {
  const history = createMemoryHistory({ initialEntries: [route] });

  return {
    ...render(
      <Provider store={store}>
        <Router history={history}>{ui}</Router>
      </Provider>,
    ),
    history,
  };
};

describe('AuthVerifyEmail tests', () => {
  test('renders the email verification screen.', () => {
    const mockPasswordStrength = jest.fn().mockImplementation(() => ({ score: 0 }));

    renderWithProviders(<AuthVerifyEmail passwordStrength={mockPasswordStrength} />);

    expect(screen.getByText('Create a password')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeDisabled();
  });

  test('a weak-password message is displayed if the password is not strong enough', async () => {
    const mockPasswordStrength = jest.fn().mockImplementation(() => ({ score: 1 }));
    renderWithProviders(<AuthVerifyEmail passwordStrength={mockPasswordStrength} />);

    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'testPass' } });

    await waitFor(() =>
      expect(screen.getByText('Password must be stronger.*')).toBeInTheDocument(),
    );
    await waitFor(() => expect(screen.getByText(/Any combination of/)).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText('Next')).toBeDisabled());
  });

  test('display a message if the passwords do not match', async () => {
    const mockPasswordStrength = jest.fn().mockImplementation(() => ({ score: 4 }));

    renderWithProviders(<AuthVerifyEmail passwordStrength={mockPasswordStrength} />);

    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'testPass' } });
    await waitFor(() => expect(screen.getByText('This password is strong.')).toBeInTheDocument());

    fireEvent.change(screen.getByLabelText('Confirm Password'), { target: { value: 'b' } });

    await waitFor(() => expect(screen.getByText('Passwords do not match.')).toBeInTheDocument());

    expect(screen.getByText('Next')).toBeDisabled();
  });

  test('display a success message if the Email Verification API call was successful.', async () => {
    const mockPasswordStrength = jest.fn().mockImplementation(() => ({ score: 5 }));
    mockPdaLookupWithEmail.mockResolvedValueOnce({
      parsedBody: {
        verified: false,
        hatCluster: 'testHatCluster',
        hatName: 'testHatName',
      },
    });
    mockVerifyEmail.mockResolvedValueOnce(true);

    renderWithProviders(<AuthVerifyEmail passwordStrength={mockPasswordStrength} />, {
      route:
        '/auth/verify-email/testVerifyToken?email=test@email.com&redirect_uri=https://test.com',
    });

    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'testPass' } });
    await waitFor(() => expect(screen.getByText('This password is strong.')).toBeInTheDocument());

    fireEvent.change(screen.getByLabelText('Confirm Password'), { target: { value: 'testPass' } });

    await waitFor(() => expect(screen.getByText('Passwords match!')).toBeInTheDocument());

    expect(screen.getByText('Next')).toBeEnabled();

    fireEvent.click(screen.getByText('Next'));

    expect(mockVerifyEmail).toHaveBeenCalledTimes(1);
    await waitFor(() =>
      expect(
        screen.queryByText(/The password to your Personal Data Account has been created./),
      ).toBeInTheDocument(),
    );
  });

  test('redirects to login when user is verified', async () => {
    const mockPasswordStrength = jest.fn().mockImplementation(() => ({ score: 5 }));
    mockPdaLookupWithEmail.mockResolvedValueOnce({
      parsedBody: {
        verified: true,
        hatCluster: 'testHatCluster',
        hatName: 'testHatName',
      },
    });

    const { history } = renderWithProviders(
      <AuthVerifyEmail passwordStrength={mockPasswordStrength} />,
      {
        route:
          '/auth/verify-email/testVerifyToken?email=test@email.com&redirect_uri=https://test.com',
      },
    );

    await waitFor(() => expect(history.location.pathname).toEqual('/auth/login'));
  });
});
