import React from 'react';
import { screen, render } from '@testing-library/react';

import DetailsHeader from './DetailsHeader';

describe('Details Header', () => {
  test('renders the details header without error', () => {
    render(
      <DetailsHeader logoSrc="testSrc" logoAltText="A Test Alt Text">
        <h1>Test</h1>
      </DetailsHeader>,
    );

    expect(screen.getByText('Test')).toBeInTheDocument();
    expect(screen.getByAltText('A Test Alt Text')).toBeInTheDocument();
  });
});
