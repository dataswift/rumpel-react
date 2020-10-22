import React from 'react';

import { screen, render } from '@testing-library/react';
import InfoList from './InfoList';

describe('Info List', () => {
  test('renders the list and ensures the correct data is present.', () => {
    const testData: Array<{ [key: string]: string }> = [
      { Test: 'Dataswift Ltd' },
      { TestLink: 'https://dataswift.io' },
    ];

    render(<InfoList title="Test Title" data={testData} />);

    expect(screen.getByText('Test Title')).toBeInTheDocument();

    expect(screen.getByText('Test')).toBeInTheDocument();
    expect(screen.getByText('Dataswift Ltd')).toBeInTheDocument();

    expect(screen.getByText('TestLink')).toBeInTheDocument();
    const link = screen.getByText('https://dataswift.io');
    expect(link).toHaveAttribute('href', 'https://dataswift.io');
  });
});
