import * as React from 'react';

import { screen, render } from '@testing-library/react';
import { InfoHeader } from './InfoHeader';

describe('InfoHeader', () => {
  test('renders the InfoHeader component and ensures the correct details are displayed', () => {
    render(<InfoHeader />);

    expect(screen.getByText('What can I do with my HAT?')).toBeInTheDocument();
    expect(screen.getByText('Learn More')).toBeInTheDocument();
    expect(screen.getByAltText('HAT Logo')).toBeInTheDocument();
  });
});
