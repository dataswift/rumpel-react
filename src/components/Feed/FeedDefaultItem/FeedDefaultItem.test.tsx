import React from 'react';
import { render, screen } from '@testing-library/react';
import { FeedDefaultItem } from './FeedDefaultItem';
import {
  SheFeedItemTextAndImage,
  SheFeedItemTextAndLocation,
  SheFeedItemTextOnly,
} from '../../../testData/SheFeed';

describe('FeedDefaultItem', () => {
  test('renders the FeedDefaultItem component without error: text only', () => {
    render(<FeedDefaultItem feedItem={SheFeedItemTextOnly} />);

    expect(screen.getByAltText('testsource')).toBeInTheDocument();
    expect(screen.getByText('Test Text Title')).toBeInTheDocument();
    expect(screen.getByText(/Posted 16 Nov 2020/i)).toBeInTheDocument();
    expect(screen.getByText('Test content text')).toBeInTheDocument();
  });

  test('renders the FeedDefaultItem component without error: text and image', () => {
    render(<FeedDefaultItem feedItem={SheFeedItemTextAndImage} />);

    expect(screen.getByAltText('testsource')).toBeInTheDocument();
    expect(screen.getByTestId('feed-card-content-image')).toHaveStyle(
      `background-image: url(${SheFeedItemTextAndImage.content?.media?.[0].url})`,
    );
    expect(screen.getByText('Test Text Title')).toBeInTheDocument();
    expect(screen.getByText(/Posted 16 Nov 2020/i)).toBeInTheDocument();
    expect(screen.getByText('Test content text')).toBeInTheDocument();
  });

  test('renders the FeedDefaultItem component without error: text and location', () => {
    render(<FeedDefaultItem feedItem={SheFeedItemTextAndLocation} />);

    expect(screen.getByAltText('testsource')).toBeInTheDocument();
    expect(screen.getByText('Test Text Title')).toBeInTheDocument();
    expect(screen.getByText('TestAddress')).toBeInTheDocument();
    expect(screen.getByText('TestStreet')).toBeInTheDocument();
    expect(screen.getByText(/Posted 16 Nov 2020/i)).toBeInTheDocument();
    expect(screen.getByText('Test content text')).toBeInTheDocument();
  });
});
