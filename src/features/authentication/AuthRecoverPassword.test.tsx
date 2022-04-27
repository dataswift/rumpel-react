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

import { recoverPassword } from '../../api/hatAPI';
import AuthRecoverPassword from './AuthRecoverPassword';
import authenticationSlice from './authenticationSlice';

jest.mock('../../api/hatAPI');

const mockRecoverPassword: jest.Mocked<any> = recoverPassword;

export const store = configureStore({
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

describe('AuthRecoverPassword tests', () => {
  const history = createMemoryHistory();

  test('renders the reset password screen.', () => {
    render(
      <Router history={history}>
        <Provider store={store}>
          <AuthRecoverPassword />
        </Provider>
      </Router>,
    );

    expect(screen.getByText('Did you forget your password?')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByText('Reset Password')).toBeInTheDocument();
    expect(screen.getByText('Reset Password')).toBeDisabled();
  });

  test('display a success message if the Change Password API call was successful.', async () => {
    mockRecoverPassword.mockResolvedValueOnce(true);

    render(
      <Router history={history}>
        <Provider store={store}>
          <AuthRecoverPassword />
        </Provider>
      </Router>,
    );

    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'test@email.com' } });

    expect(screen.getByText('Reset Password')).toBeEnabled();
    fireEvent.click(screen.getByText('Reset Password'));

    expect(mockRecoverPassword).toHaveBeenCalledWith('testHatName.testHatCluster', {
      email: 'test@email.com',
    });

    await waitFor(() =>
      expect(
        screen.queryByText(
          /If this email address is an active account, you will receive an email shortly./,
        ),
      ).toBeInTheDocument(),
    );
    await waitFor(() =>
      expect(
        screen.queryByText(/if you do not receive a reset link, check your spam folder or/),
      ).toBeInTheDocument(),
    );
  });
});
