import * as React from 'react';
import { Provider } from 'react-redux';
import { screen, render } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import messagesSlice from '../../../features/messages/messagesSlice';

import TileHeader from './TileHeader';

export const store = configureStore({
  reducer: {
    messages: messagesSlice,
  },
  preloadedState: {
    messages: {
      title: 'title',
      description: 'description',
    },
  },
});

describe('TileHeader', () => {
  test('renders without error and displays the correct information.', () => {
    render(
      <Provider store={store}>
        <TileHeader titleId="title" icon="test_icon" descriptionId={'description'} />
      </Provider>,
    );

    expect(screen.getByText('title')).toBeInTheDocument();
    expect(screen.getByText('test_icon')).toBeInTheDocument();
    expect(screen.getByText('description')).toBeInTheDocument();
  });
});
