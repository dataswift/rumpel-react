import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { createMemoryHistory } from 'history';
import { Router, Route } from 'react-router-dom';

import toolsSlice, { tools } from './toolsSlice';
import TEST_HAT_TOOL from '../../testData/Tool';
import ToolDetails from './ToolDetails';

export const store = configureStore({
  reducer: {
    tools: toolsSlice,
  },
});

describe('Tool Details screen', () => {
  test('renders and displays an Inactive tool', () => {
    const history = createMemoryHistory({ initialEntries: ['/tools/test-feed-counter'] });
    store.dispatch(tools([{ ...TEST_HAT_TOOL, status: { enabled: false, available: false } }]));

    render(
      <Router history={history}>
        <Route path="/tools/:toolId">
          <Provider store={store}>
            <ToolDetails />
          </Provider>
        </Route>
      </Router>,
    );

    expect(screen.getByText('Test Tool')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Connect'));
  });

  test('renders and displays an Active tool', () => {
    const history = createMemoryHistory({ initialEntries: ['/tools/test-feed-counter'] });
    store.dispatch(tools([{ ...TEST_HAT_TOOL, status: { enabled: true, available: true } }]));

    render(
      <Router history={history}>
        <Route path="/tools/:toolId">
          <Provider store={store}>
            <ToolDetails />
          </Provider>
        </Route>
      </Router>,
    );

    fireEvent.click(screen.getByText('Active'));
  });
});
