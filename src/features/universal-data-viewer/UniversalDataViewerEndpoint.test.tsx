import React from 'react';
import { screen, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router';

import { configureStore } from '@reduxjs/toolkit';
import universalDataViewerSlice from "./universalDataViewerSlice";
import UniversalDataViewerEndpoint from "./UniversalDataViewerEndpoint";
import TEST_ENDPOINT_DATA_PREVIEW from "../../testData/EndpointDataPreview";

export const store = configureStore({
  reducer: {
    universalDataViewer: universalDataViewerSlice,
  },
  preloadedState: {
    universalDataViewer: {
      endpointDataPreview: TEST_ENDPOINT_DATA_PREVIEW,
    },
  },
});

describe('Universal Data Viewer Endpoint page tests', () => {
  test('renders a list of endpoint\'s data', () => {
    const history = createMemoryHistory();
    history.push('/universal-data-viewer/testNamespace/testEndpoint',
      { namespace: 'testNamespace', endpoint: 'testEndpoint' }
    );

    render(
      <Router history={history}>
        <Provider store={store}>
          <UniversalDataViewerEndpoint />
        </Provider>
      </Router>,
    );

    expect(history.location.pathname).toEqual('/universal-data-viewer/testNamespace/testEndpoint');

    expect(screen.getByText('Test Data Value')).toBeInTheDocument();
    expect(screen.getByText('Test Another Data Value')).toBeInTheDocument();
    expect(screen.getByText('Load more')).toBeInTheDocument();
  });
});
