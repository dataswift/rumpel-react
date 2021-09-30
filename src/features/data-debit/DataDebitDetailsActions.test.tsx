import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { createMemoryHistory } from 'history';
import { Router, Route } from 'react-router-dom';

import messagesSlice from '../messages/messagesSlice';
import messages from '../../translations/en.json';
import dataDebitSlice from './dataDebitSlice';
import TEST_DATA_DEBIT from '../../testData/DataDebit';
import DataDebitDetailsActions from './DataDebitDetailsActions';

export const store = configureStore({
  reducer: {
    dataDebits: dataDebitSlice,
    messages: messagesSlice,
  },
  preloadedState: {
    dataDebits: {
      dataDebits: TEST_DATA_DEBIT,
    },
    messages,
  },
});

describe('Data Debit Details Actions', () => {
  test('the close button is rendered and takes the user back a page when clicked', () => {
    const history = createMemoryHistory({ initialEntries: ['/data-debit'] });
    history.push('/data-debit/TestExpiredDataDebit');

    render(
      <Router history={history}>
        <Route path="/data-debit/:dataDebitParam">
          <Provider store={store}>
            <DataDebitDetailsActions active={false} dataDebitId="TestExpiredDataDebit" />
          </Provider>
        </Route>
      </Router>,
    );

    fireEvent.click(screen.getByText('clear'));
    expect(history.location.pathname).toEqual('/data-debit');
  });

  test('the Make debit inactive button is visible', () => {
    const history = createMemoryHistory({ initialEntries: ['/data-debit/TestActiveDataDebit'] });

    render(
      <Router history={history}>
        <Route path="/data-debit/:dataDebitParam">
          <Provider store={store}>
            <DataDebitDetailsActions active dataDebitId="TestActiveDataDebit" />
          </Provider>
        </Route>
      </Router>,
    );

    fireEvent.click(screen.getByText('Make debit inactive'));
  });

  test('ensure the user can open and close the actions menu', () => {
    const history = createMemoryHistory({ initialEntries: ['/data-debit/TestActiveDataDebit'] });

    render(
      <Router history={history}>
        <Route path="/data-debit/:dataDebitParam">
          <Provider store={store}>
            <DataDebitDetailsActions active dataDebitId="TestActiveDataDebit" />
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
