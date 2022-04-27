import React from 'react';
import { screen, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { createMemoryHistory } from 'history';
import { Router, Route } from 'react-router-dom';

import DataDebitDetails from './DataDebitDetails';
import dataDebitSlice from './dataDebitSlice';
import messagesSlice from '../messages/messagesSlice';
import TEST_DATA_DEBIT from '../../testData/DataDebit';
import messages from '../../translations/en.json';

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

describe('Data Debit Details', () => {
  test('renders and displays the correct data debit details', () => {
    const history = createMemoryHistory({ initialEntries: ['/data-debit/TestActiveDataDebit'] });

    render(
      <Router history={history}>
        <Route path="/data-debit/:dataDebitParam">
          <Provider store={store}>
            <DataDebitDetails />
          </Provider>
        </Route>
      </Router>,
    );

    expect(screen.getByText('TestActiveDataDebit')).toBeInTheDocument();
    expect(
      screen.getByText('Details of your data debit agreement with the provider'),
    ).toBeInTheDocument();
    expect(screen.getByText('Active')).toBeInTheDocument();
    expect(screen.getByText('12 Apr 2019')).toBeInTheDocument();
    expect(screen.getByText('arrow_forward')).toBeInTheDocument();
    expect(screen.getByText('until cancelled')).toBeInTheDocument();
    expect(screen.getByText('TestClientDescription')).toBeInTheDocument();
    expect(screen.getByAltText('Data Debit Logo')).toBeInTheDocument();
    expect(screen.getByText('Purpose')).toBeInTheDocument();
    expect(screen.getByText('TestClientPurpose')).toBeInTheDocument();
    expect(screen.getByText('Requirements')).toBeInTheDocument();
    expect(screen.getByText('test profile')).toBeInTheDocument();
    expect(screen.getByText('name')).toBeInTheDocument();
    expect(screen.getByText('photo')).toBeInTheDocument();
    expect(screen.getByText('TestClientName')).toBeInTheDocument();
    expect(screen.getByText('Created the data debit')).toBeInTheDocument();
  });
});
