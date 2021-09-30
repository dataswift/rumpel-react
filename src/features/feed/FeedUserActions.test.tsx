import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { FeedUserActions } from './FeedUserActions';

describe('FeedUserActions', () => {
  test('renders the FeedUserActions component without error', () => {
    const mockOnSelectedDates = jest.fn();
    const mockOnRefresh = jest.fn();
    const mockOnGoToToday = jest.fn();

    render(
      <FeedUserActions onSelectedDates={mockOnSelectedDates} onGoToToday={mockOnGoToToday} onRefresh={mockOnRefresh} />,
    );

    const filter = screen.getByText('Filter');
    const today = screen.getByText('Today');
    const refresh = screen.getByText('Refresh');

    expect(filter).toBeInTheDocument();
    expect(today).toBeInTheDocument();
    expect(refresh).toBeInTheDocument();

    fireEvent.click(today);
    expect(mockOnGoToToday).toBeCalledTimes(1);

    fireEvent.click(filter);
    fireEvent.click(screen.getByText('Done'));
    expect(mockOnSelectedDates).toBeCalledTimes(1);

    fireEvent.click(refresh);
    expect(mockOnRefresh).toBeCalledTimes(1);
  });
});
