import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router';

import { configureStore } from '@reduxjs/toolkit';
import applicationsSlice from '../applications/applicationsSlice';

import TEST_DATA_PLUG from '../../testData/DataPlug';
import DataPlugs from './DataPlugs';

export const store = configureStore({
  reducer: {
    applications: applicationsSlice,
  },
  preloadedState: {
    applications: {
      applications: [TEST_DATA_PLUG],
    },
  },
});

describe('Data Plugs page tests', () => {
  test('renders a list of items that navigates the user when clicked', () => {
    const history = createMemoryHistory({ initialEntries: ['/explore/DataPlug'] });

    render(
      <Router history={history}>
        <Provider store={store}>
          <DataPlugs />
        </Provider>
      </Router>,
    );

    expect(history.location.pathname).toEqual('/explore/DataPlug');
    const application = screen.getByText('Test Data Plug');
    expect(application).toBeInTheDocument();

    fireEvent.click(application);

    expect(history.location.pathname).toEqual('/explore/DataPlug/2');
  });
});
