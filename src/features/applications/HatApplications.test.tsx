import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router';

import HatApplications from './HatApplications';
import applicationsSlice from './applicationsSlice';

import { configureStore } from '@reduxjs/toolkit';
import TEST_HAT_APPLICATION from '../../testData/HatApplications';

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

describe('Hat Application page tests', () => {
  test('renders a list of items that navigates the user when clicked', () => {
    const history = createMemoryHistory({ initialEntries: ['/applications'] });

    render(
      <Router history={history}>
        <Provider store={store}>
          <HatApplications />
        </Provider>
      </Router>,
    );

    expect(history.location.pathname).toEqual('/applications');
    const application = screen.getByText('Test Application');
    expect(application).toBeInTheDocument();

    fireEvent.click(application);

    expect(history.location.pathname).toEqual('/applications/1');
  });
});
