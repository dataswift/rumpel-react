import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router';

import DataDebits from './DataDebits';
import dataDebitSlice from './dataDebitSlice';
import messagesSlice from '../messages/messagesSlice';
import messages from '../../translations/en.json';

import { configureStore } from '@reduxjs/toolkit';
import TEST_DATA_DEBIT from '../../testData/DataDebit';
import { getDataDebits } from '../../api/hatAPI';

jest.mock('../../api/hatAPI');

const mockGetDataDebits: jest.Mocked<any> = getDataDebits;

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

describe('Data Debits page tests', () => {
  test('renders a list of data debit items that navigates the user when clicked', () => {
    const history = createMemoryHistory({ initialEntries: ['/data-debit'] });
    mockGetDataDebits.mockResolvedValueOnce(true);

    render(
      <Router history={history}>
        <Provider store={store}>
          <DataDebits />
        </Provider>
      </Router>,
    );

    expect(history.location.pathname).toEqual('/data-debit');
    expect(mockGetDataDebits).toHaveBeenCalledTimes(1);

    expect(screen.getByText('TestExpiredDataDebit')).toBeInTheDocument();
    expect(screen.getByText(/expired 12 Dec 2017/i)).toBeInTheDocument();

    expect(screen.getByText('active')).toBeInTheDocument();
    const activeDataDebit = screen.getByText('TestActiveDataDebit');
    fireEvent.click(activeDataDebit);

    expect(history.location.pathname).toEqual('/data-debit/TestActiveDataDebit');
  });
});
