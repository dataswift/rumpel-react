import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { createMemoryHistory } from 'history';
import { Router, Route } from 'react-router-dom';

import toolsSlice from './toolsSlice';
import messagesSlice from '../messages/messagesSlice';
import TEST_HAT_TOOL from '../../testData/Tool';
import ToolDetailsActions from './ToolDetailsActions';
import messages from '../../translations/en.json';

export const store = configureStore({
  reducer: {
    tools: toolsSlice,
    messages: messagesSlice,
  },
  preloadedState: {
    tools: {
      tools: [TEST_HAT_TOOL],
      expirationTime: 20,
    },
    messages,
  },
});

describe('Tool Details Actions', () => {
  test('the close button is rendered and takes the user back a page when clicked', () => {
    const history = createMemoryHistory({ initialEntries: ['/tools'] });
    history.push('/tools/test-feed-counter');

    render(
      <Router history={history}>
        <Route path="/tools/:toolId">
          <Provider store={store}>
            <ToolDetailsActions setup={false} toolId={'test-feed-counter'} />
          </Provider>
        </Route>
      </Router>,
    );

    fireEvent.click(screen.getByText('clear'));
    expect(history.location.pathname).toEqual('/tools');
  });

  test('ensure the user can open and close the actions menu', () => {
    const history = createMemoryHistory({ initialEntries: ['/tools/test-feed-counter'] });

    render(
      <Router history={history}>
        <Route path="/tools/:toolId">
          <Provider store={store}>
            <ToolDetailsActions setup toolId={'test-feed-counter'} />
          </Provider>
        </Route>
      </Router>,
    );

    fireEvent.click(screen.getByText('more_horiz'));
    expect(screen.getByLabelText('Action Menu')).toHaveAttribute('style', 'display: flex;');

    fireEvent.click(screen.getByText('Cancel'));
    expect(screen.getByLabelText('Action Menu')).not.toHaveAttribute('style', 'display: flex;');
  });
});
