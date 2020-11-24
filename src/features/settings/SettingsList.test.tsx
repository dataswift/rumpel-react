import React from 'react';
import { Provider } from 'react-redux';
import { screen, render, fireEvent } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import messages from '../../translations/en.json';

import messagesSlice from '../../features/messages/messagesSlice';
import SettingsList from './SettingsList';

export const store = configureStore({
  reducer: { messages: messagesSlice },
  preloadedState: { messages },
});

describe('Settings List', () => {
  test('render the settings list with the expected data', () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <Provider store={store}>
          <SettingsList />
        </Provider>
      </Router>,
    );

    expect(screen.getByText('Private data account')).toBeInTheDocument();
    expect(screen.getByText('Change password').closest('a')).toHaveAttribute('href', '/user/password/change');
    expect(screen.getByText('Terms of Service')).toBeInTheDocument();
    expect(screen.getByText('Version')).toBeInTheDocument();
    expect(screen.getByText('Vendor (where you got your HAT)')).toBeInTheDocument();
  });

  test('external links navigate correctly', () => {
    const history = createMemoryHistory();
    global.window = Object.create(window);
    Object.defineProperty(window, 'location', {
      value: {
        href: '',
      },
    });

    render(
      <Router history={history}>
        <Provider store={store}>
          <SettingsList />
        </Provider>
      </Router>,
    );

    fireEvent.click(screen.getByText('Tech support'));
    expect(window.location.href).toEqual('mailto:contact@dataswift.io');
  });
});
