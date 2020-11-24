import React from 'react';
import { screen, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import systemStatusSlice from '../system-status/systemStatusSlice';
import profileSlice from '../profile/profileSlice';
import authenticationSlice from '../authentication/authenticationSlice';
import messagesSlice from '../messages/messagesSlice';
import messages from '../../translations/en.json';

import TEST_PROFILE from '../../testData/Profile';
import TEST_AUTH from '../../testData/Auth';
import TEST_SYSTEM_STATUS from '../../testData/SystemStatus';
import Settings from './Settings';

export const store = configureStore({
  reducer: {
    systemStatus: systemStatusSlice,
    profile: profileSlice,
    authentication: authenticationSlice,
    messages: messagesSlice,
  },
  preloadedState: {
    systemStatus: {
      systemStatus: TEST_SYSTEM_STATUS,
    },
    profile: {
      profile: TEST_PROFILE,
    },
    authentication: TEST_AUTH,
    messages,
  },
});

describe('Hat Application Details', () => {
  test('renders and displays the correct hat application details', () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <Provider store={store}>
          <Settings />
        </Provider>
      </Router>,
    );

    expect(screen.getByText('TestName')).toBeInTheDocument();
    expect(screen.getByText('.dataswift.dev')).toBeInTheDocument();
    expect(screen.getByText('1% of 100MB storage used')).toBeInTheDocument();

    const avatar = screen.getByAltText('Profile Avatar');
    expect(avatar).toHaveAttribute('src', 'avatarTestPath');

    expect(screen.getByRole('button', { name: 'Logout' })).toBeInTheDocument();
  });
});
