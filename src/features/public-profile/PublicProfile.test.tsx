import React from 'react';
import { screen, render, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter as Router } from 'react-router-dom';

import { fetchNotification } from '../../services/NotificationService';
import { RibbonProvider } from '@dataswift/shared';
import { PublicProfile } from './PublicProfile';
import { configureStore } from '@reduxjs/toolkit';
import publicProfileSlice from './publicProfileSlice';
import authenticationSlice from '../authentication/authenticationSlice';

import TEST_PROFILE from '../../testData/Profile';

jest.mock('../../services/NotificationService');
const mockFetchNotification: jest.Mocked<any> = fetchNotification;

const STUB_DATE = '2021-01-01T00:00:00Z';

const store = configureStore({
  reducer: {
    authentication: authenticationSlice,
    publicProfile: publicProfileSlice,
  },
  preloadedState: {
    publicProfile: {
      pending: false,
      profile: TEST_PROFILE,
    },
    authentication: {
      isAuthenticated: true,
    },
  },
});

const renderWithProviders = (ui: any) => {
  return {
    ...render(
      <Provider store={store}>
        <RibbonProvider>
          <Router>{ui}</Router>
        </RibbonProvider>
      </Provider>,
    ),
  };
};

beforeEach(() => {
  jest.resetAllMocks();
});

describe('Public Profile Page', () => {
  test('renders without error', () => {
    renderWithProviders(<PublicProfile />);

    expect(screen.getByText('Public profile of')).toBeInTheDocument();
  });

  test('notification appears when landing on the screen', async () => {
    window.localStorage.clear();
    mockFetchNotification.mockResolvedValueOnce({
      title: 'ribbon notification',
    });
    renderWithProviders(<PublicProfile />);

    await waitFor(() => expect(screen.queryByText('ribbon notification')).toBeInTheDocument());
  });

  test('notification does not appear is the date is the same as the curent day.', async () => {
    jest.spyOn(global.Date, 'now').mockImplementation(() => new Date(STUB_DATE).valueOf());
    window.localStorage.setItem('dataswift-notification', JSON.stringify(STUB_DATE));
    mockFetchNotification.mockResolvedValueOnce({
      title: 'ribbon notification',
    });

    renderWithProviders(<PublicProfile />);

    await waitFor(() => expect(screen.queryByText('ribbon notification')).toBeNull());
  });
});
