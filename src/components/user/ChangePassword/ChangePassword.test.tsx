import React from 'react';
import { screen, render, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import messagesSlice from '../../../features/messages/messagesSlice';
import authenticationSlice, { AuthState } from '../../../features/authentication/authenticationSlice';
import messages from '../../../translations/en.json';
import { ChangePassword } from './ChangePassword';

import { changePassword } from '../../../api/hatAPI';

jest.mock('../../../api/hatAPI');

const mockChangePassword: jest.Mocked<any> = changePassword;

export const store = configureStore({
  reducer: {
    messages: messagesSlice,
    authentication: authenticationSlice,
  },
  preloadedState: {
    messages,
    authentication: {
      isAuthenticated: false,
      rememberMe: false,
      authState: AuthState.LOGIN_REQUEST,
      hatName: 'Test',
      hatDomain: '.test.com',
    },
  },
});

beforeEach(() => {
  jest.resetAllMocks();
});

describe('Change Password', () => {
  test('renders the change password screen.', () => {
    const mockPasswordStrength = jest.fn().mockImplementation(() => ({ score: 0 }));
    render(
      <Provider store={store}>
        <ChangePassword passwordStrength={mockPasswordStrength} />
      </Provider>,
    );

    expect(screen.getByText('Test.test.com')).toBeInTheDocument();
    expect(screen.getByText('Change Password')).toBeInTheDocument();
    expect(screen.getByText(/A combination of three random /)).toBeInTheDocument();
    expect(screen.getByLabelText('Please enter your current HAT password')).toBeInTheDocument();
    expect(screen.getByLabelText('Please enter a new HAT password')).toBeInTheDocument();
    expect(screen.getByLabelText('Please confirm your new HAT password')).toBeInTheDocument();
  });

  test('a weak-password message is displayed if the password is not strong enough', () => {
    const mockPasswordStrength = jest.fn().mockImplementation(() => ({ score: 0 }));
    render(
      <Provider store={store}>
        <ChangePassword passwordStrength={mockPasswordStrength} />
      </Provider>,
    );

    fireEvent.click(screen.getByText('Change Password'));
    expect(screen.getByText(/Password must be stronger/)).toBeInTheDocument();
  });

  test('display a message if the passwords do not match', () => {
    const mockPasswordStrength = jest.fn().mockImplementation(() => ({ score: 0 }));
    render(
      <Provider store={store}>
        <ChangePassword passwordStrength={mockPasswordStrength} />
      </Provider>,
    );

    fireEvent.change(screen.getByPlaceholderText('Current password'), { target: { value: 'a' } });
    fireEvent.change(screen.getByPlaceholderText('New HAT password'), { target: { value: 'b' } });
    fireEvent.change(screen.getByPlaceholderText('Confirm new password'), { target: { value: 'c' } });

    fireEvent.click(screen.getByText('Change Password'));
    expect(screen.getByText('Passwords do not match.')).toBeInTheDocument();
  });

  test('display a success message if the Change Password API call was successful.', async () => {
    const mockPasswordStrength = jest.fn().mockImplementation(() => ({ score: 5 }));
    mockChangePassword.mockResolvedValueOnce(true);

    render(
      <Provider store={store}>
        <ChangePassword passwordStrength={mockPasswordStrength} />
      </Provider>,
    );

    fireEvent.change(screen.getByPlaceholderText('Current password'), { target: { value: 'test' } });
    fireEvent.change(screen.getByPlaceholderText('New HAT password'), { target: { value: 'T3stPassword' } });
    fireEvent.change(screen.getByPlaceholderText('Confirm new password'), { target: { value: 'T3stPassword' } });

    fireEvent.click(screen.getByText('Change Password'));
    expect(mockChangePassword).toHaveBeenCalledTimes(1);
    await waitFor(() => expect(screen.queryByText(/Password changed. You can now log /)).toBeInTheDocument());
  });

  test('display an e message if the Change Password API call failed.', async () => {
    const mockPasswordStrength = jest.fn().mockImplementation(() => ({ score: 5 }));
    mockChangePassword.mockRejectedValueOnce(true);

    render(
      <Provider store={store}>
        <ChangePassword passwordStrength={mockPasswordStrength} />
      </Provider>,
    );

    fireEvent.change(screen.getByPlaceholderText('Current password'), { target: { value: 'test' } });
    fireEvent.change(screen.getByPlaceholderText('New HAT password'), { target: { value: 'T3stPassword' } });
    fireEvent.change(screen.getByPlaceholderText('Confirm new password'), { target: { value: 'T3stPassword' } });

    fireEvent.click(screen.getByText('Change Password'));
    expect(mockChangePassword).toHaveBeenCalledTimes(1);
    await waitFor(() => expect(screen.queryByText(/It seems there was a glitch in the matrix./)).toBeInTheDocument());
  });
});
