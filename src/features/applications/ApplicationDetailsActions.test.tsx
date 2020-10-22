import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { createMemoryHistory } from 'history';
import { Router, Route } from 'react-router-dom';

import applicationsSlice from './applicationsSlice';
import TEST_HAT_APPLICATION from '../../testData/HatApplications';
import ApplicationDetailsActions from './ApplicationDetailsActions';

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

describe('Hat Application Details Actions', () => {
  test('the close button is rendered and takes the user back a page when clicked', () => {
    const history = createMemoryHistory({ initialEntries: ['/applications'] });
    history.push('/applications/1');

    render(
      <Router history={history}>
        <Route path="/applications/:appId">
          <Provider store={store}>
            <ApplicationDetailsActions setup={false} appId={'1'} />
          </Provider>
        </Route>
      </Router>,
    );

    fireEvent.click(screen.getByText('clear'));
    expect(history.location.pathname).toEqual('/applications');
  });

  test('the app permission button navigates to the correct uri when clicked', () => {
    const history = createMemoryHistory({ initialEntries: ['/applications/1'] });

    render(
      <Router history={history}>
        <Route path="/applications/:appId">
          <Provider store={store}>
            <ApplicationDetailsActions setup appId={'1'} />
          </Provider>
        </Route>
      </Router>,
    );

    fireEvent.click(screen.getByText('App permissions'));
    expect(history.location.pathname).toEqual('/applications/1/permissions');
  });

  test('ensure the user can open and close the actions menu', () => {
    const history = createMemoryHistory({ initialEntries: ['/applications/1'] });

    render(
      <Router history={history}>
        <Route path="/applications/:appId">
          <Provider store={store}>
            <ApplicationDetailsActions setup appId={'1'} />
          </Provider>
        </Route>
      </Router>,
    );

    fireEvent.click(screen.getByText('more_horiz'));
    expect(screen.getByLabelText('Application Action Menu')).toHaveAttribute('style', 'display: flex;');

    fireEvent.click(screen.getByText('Cancel'));
    expect(screen.getByLabelText('Application Action Menu')).not.toHaveAttribute('style', 'display: flex;');
  });
});
