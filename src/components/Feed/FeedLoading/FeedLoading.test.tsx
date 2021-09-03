import React from 'react';
import { render, screen } from '@testing-library/react';
import { FeedLoading } from './FeedLoading';

describe('FeedLoading', () => {
  test('renders the Feed Loading component without error: loading', () => {
    render(<FeedLoading fetchingData={true} />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('renders the Feed Loading component without error: default for infinite scrolling', () => {
    render(<FeedLoading fetchingData={false} />);

    expect(screen.getByText('No items found')).toBeInTheDocument();
    expect(screen.getByText('Connect Data Plugs to see your data in the feed')).toBeInTheDocument();
  });

  test('renders the Feed Loading component without error: default for filtered data', () => {
    render(<FeedLoading fetchingData={false} filteredData />);

    expect(screen.getByText('No results found for the selected dates')).toBeInTheDocument();
  });
});
