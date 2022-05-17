import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { createMemoryHistory } from 'history';
import { Router, Route } from 'react-router-dom';

import applicationsSlice from '../applications/applicationsSlice';
import DataPlugDetails from "./DataPlugDetails";
import TEST_DATA_PLUG from "../../testData/DataPlug";

export const store = configureStore({
  reducer: {
    applications: applicationsSlice,
  },
  preloadedState: {
    applications: {
      applications: [TEST_DATA_PLUG],
      applicationHmi: undefined,
      applicationHmiState: 'idle',
      expirationTime: 20,
    },
  },
});

describe('Data Plug Details', () => {
  test('renders and displays the correct data plug details', () => {
    const history = createMemoryHistory({ initialEntries: ['/explore/DataPlug/2'] });

    render(
      <Router history={history}>
        <Route path="/explore/DataPlug/:appId">
          <Provider store={store}>
            <DataPlugDetails />
          </Provider>
        </Route>
      </Router>,
    );

    expect(screen.getByText('Test Data Plug')).toBeInTheDocument();
    expect(screen.getByText('more_horiz')).toBeInTheDocument();
    expect(screen.getByText('Fetching...')).toBeInTheDocument();
    expect(screen.getByAltText('Data Plug Logo')).toBeInTheDocument();
  });

  test('the correct location is called when the user clicks on the status button', () => {
    const history = createMemoryHistory({ initialEntries: ['/explore/DataPlug/2'] });

    render(
      <Router history={history}>
        <Route path="/explore/DataPlug/:appId">
          <Provider store={store}>
            <DataPlugDetails />
          </Provider>
        </Route>
      </Router>,
    );

    fireEvent.click(screen.getByText('sync'));

    expect(history.location.pathname).toEqual('/auth/oauth');
    expect(history.location.search).toEqual(
      '?application_id=2&fallback=http://localhost/&redirect_uri=https://setup-url.dataswift.io%3Fredirect=http://localhost/',
    );
  });
});
