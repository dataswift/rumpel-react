import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router';

import ToolsList from './ToolsList';
import toolsSlice from './toolsSlice';

import { configureStore } from '@reduxjs/toolkit';
import TEST_HAT_TOOL from '../../testData/Tool';

const store = configureStore({
  reducer: {
    tools: toolsSlice,
  },
  preloadedState: {
    tools: { 
      tools: [TEST_HAT_TOOL],
      expirationTime: 20,
    },
  },
});

describe('Tools List', () => {
  test('renders a list of tools that navigates the user when clicked', () => {
    const history = createMemoryHistory({ initialEntries: ['/tools'] });

    render(
      <Router history={history}>
        <Provider store={store}>
          <ToolsList />
        </Provider>
      </Router>,
    );

    expect(history.location.pathname).toEqual('/tools');
    const tool = screen.getByText('Test Tool');
    fireEvent.click(tool);

    expect(history.location.pathname).toEqual('/tools/test-feed-counter');
  });
});
