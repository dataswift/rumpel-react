import React from 'react';
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import { configureStore } from "@reduxjs/toolkit";
import messages from '../../translations/en.json';

import messagesSlice from '../../features/messages/messagesSlice';
import applicationsSlice from '../../features/applications/applicationsSlice';
import languageSlice from '../../features/language/languageSlice';
import { Provider } from "react-redux";
import { createMemoryHistory } from "history";
import { Router } from "react-router";

import { verifyEmail } from '../../api/hatAPI';
import { AuthVerifyEmail } from "./AuthVerifyEmail";
jest.mock('../../api/hatAPI');

const mockVerifyEmail: jest.Mocked<any> = verifyEmail;

export const store = configureStore({
  reducer: {
    messages: messagesSlice,
    applications: applicationsSlice,
    language: languageSlice
  },
  preloadedState: {
    messages,
    applications: {
      applications: []
    },
    language: {
      language: 'en'
    }
  },
});

beforeEach(() => {
  jest.resetAllMocks();
});

describe('AuthVerifyEmail tests', () => {
  const history = createMemoryHistory();

  test('renders the email verification screen.', () => {
    const mockPasswordStrength = jest.fn().mockImplementation(() => ({ score: 0 }));

    render(
      <Router history={history}>
        <Provider store={store}>
          <AuthVerifyEmail passwordStrength={mockPasswordStrength} />
        </Provider>
      </Router>,
    );

    expect(screen.getByText('Create a password')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeDisabled();
  });

  test('a weak-password message is displayed if the password is not strong enough', async () => {
    const mockPasswordStrength = jest.fn().mockImplementation(() => ({ score: 1 }));
    render(
      <Router history={history}>
        <Provider store={store}>
          <AuthVerifyEmail passwordStrength={mockPasswordStrength} />
        </Provider>
      </Router>,
    );

    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'testPass' } });

    await waitFor(() => expect(screen.getByText('Password must be stronger.*')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText(/Any combination of/)).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText('Next')).toBeDisabled());
  });

  test('display a message if the passwords do not match', async () => {
    const mockPasswordStrength = jest.fn().mockImplementation(() => ({ score: 4 }));
    render(
      <Router history={history}>
        <Provider store={store}>
          <AuthVerifyEmail passwordStrength={mockPasswordStrength} />
        </Provider>
      </Router>,
    );

    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'testPass' } });
    await waitFor(() => expect(screen.getByText('This password is strong.')).toBeInTheDocument());

    fireEvent.change(screen.getByLabelText('Confirm Password'), { target: { value: 'b' } });

    await waitFor(() => expect(screen.getByText('Passwords do not match.')).toBeInTheDocument());

    expect(screen.getByText('Next')).toBeDisabled();
  });

  test('display a success message if the Email Verification API call was successful.', async () => {
    const mockPasswordStrength = jest.fn().mockImplementation(() => ({ score: 5 }));
    mockVerifyEmail.mockResolvedValueOnce(true);

    render(
      <Router history={history}>
        <Provider store={store}>
          <AuthVerifyEmail passwordStrength={mockPasswordStrength} />
        </Provider>
      </Router>,
    );

    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'testPass' } });
    await waitFor(() => expect(screen.getByText('This password is strong.')).toBeInTheDocument());

    fireEvent.change(screen.getByLabelText('Confirm Password'), { target: { value: 'testPass' } });

    await waitFor(() => expect(screen.getByText('Passwords match!')).toBeInTheDocument());

    expect(screen.getByText('Next')).toBeEnabled();

    fireEvent.click(screen.getByText('Next'));

    expect(mockVerifyEmail).toHaveBeenCalledTimes(1);
    await waitFor(() => expect(screen.queryByText(/The password to your Personal Data Account has been created./)).toBeInTheDocument());
  });
});
