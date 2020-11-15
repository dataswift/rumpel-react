import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { createMemoryHistory } from 'history';
import { Router, Route } from 'react-router-dom';

import applicationsSlice from './applicationsSlice';
import TEST_HAT_APPLICATION from '../../testData/HatApplications';
import ApplicationDetails from './ApplicationDetails';

export const store = configureStore({
  reducer: {
    applications: applicationsSlice,
  },
  preloadedState: {
    applications: {
      applications: [TEST_HAT_APPLICATION],
    },
  },
});

describe('Hat Application Details', () => {
  test('renders and displays the correct hat application details', () => {
    const history = createMemoryHistory({ initialEntries: ['/explore/App/1'] });

    render(
      <Router history={history}>
        <Route path="/explore/App/:appId">
          <Provider store={store}>
            <ApplicationDetails />
          </Provider>
        </Route>
      </Router>,
    );

    expect(screen.getByText('Test Application')).toBeInTheDocument();
    expect(screen.getByText('more_horiz')).toBeInTheDocument();
    expect(screen.getByText('Active')).toBeInTheDocument();
    expect(screen.getByAltText('HAT Application Logo')).toBeInTheDocument();
  });

  test('the correct location is called when the user clicks on the status button', () => {
    const history = createMemoryHistory({ initialEntries: ['/explore/App/1'] });

    render(
      <Router history={history}>
        <Route path="/explore/App/:appId">
          <Provider store={store}>
            <ApplicationDetails />
          </Provider>
        </Route>
      </Router>,
    );

    fireEvent.click(screen.getByText('exit_to_app'));

    expect(history.location.pathname).toEqual('/auth/oauth');
    expect(history.location.search).toEqual(
      '?application_id=1&fallback=http://localhost/&redirect_uri=http://localhost/&internal=true',
    );
  });
});
