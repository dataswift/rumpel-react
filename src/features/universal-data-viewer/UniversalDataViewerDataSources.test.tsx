import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router';

import { configureStore } from '@reduxjs/toolkit';
import UniversalDataViewerDataSources from './UniversalDataViewerDataSources';
import universalDataViewerSlice from './universalDataViewerSlice';
import TEST_DATA_SOURCES from '../../testData/DataSources';

export const store = configureStore({
  reducer: {
    universalDataViewer: universalDataViewerSlice,
  },
  preloadedState: {
    universalDataViewer: {
      dataSources: TEST_DATA_SOURCES,
    },
  },
});

describe('Universal Data Viewer Data Sources page tests', () => {
  test('renders a list of items that navigates the user when clicked', () => {
    const history = createMemoryHistory({ initialEntries: ['/universal-data-viewer'] });

    render(
      <Router history={history}>
        <Provider store={store}>
          <UniversalDataViewerDataSources />
        </Provider>
      </Router>,
    );

    expect(history.location.pathname).toEqual('/universal-data-viewer');
    const endpoint = screen.getByText('starter-app-js-notes');
    expect(endpoint).toBeInTheDocument();

    fireEvent.click(endpoint);

    expect(history.location.pathname).toEqual('/universal-data-viewer/testhatapp/starter-app-js-notes');
  });
});
