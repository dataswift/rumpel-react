import * as React from 'react';
import { screen, render } from '@testing-library/react';

import TileHeader from './TileHeader';

describe('TileHeader', () => {
  test('renders without error and displays the correct information.', () => {
    render(<TileHeader title="title" icon="test_icon" description={'description'} />);

    expect(screen.getByText('title')).toBeInTheDocument();
    expect(screen.getByText('test_icon')).toBeInTheDocument();
    expect(screen.getByText('description')).toBeInTheDocument();
  });
});
