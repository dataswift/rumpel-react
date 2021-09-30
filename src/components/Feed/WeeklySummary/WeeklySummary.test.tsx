import { render, screen } from '@testing-library/react';
import React from 'react';
import { WeeklySummary } from './WeeklySummary';
import { SheFeedItemWeeklySummary } from '../../../testData/SheFeed';

describe('WeeklySummary', () => {
  test('renders the Weekly Summary component without error', () => {
    render(<WeeklySummary feedItem={SheFeedItemWeeklySummary} />);

    expect(screen.getByAltText('facebook')).toBeInTheDocument();
    expect(screen.getByAltText('twitter')).toBeInTheDocument();
    expect(screen.getByText('Test facebook')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('Test twitter')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('Your recent activity summary')).toBeInTheDocument();
    expect(screen.getByText('11 April 20:23 - 07 August 15:41 GMT')).toBeInTheDocument();
  });
});
