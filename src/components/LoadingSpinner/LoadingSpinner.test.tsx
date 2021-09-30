import { createMemoryHistory } from 'history';
import { Router } from 'react-router';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { LoadingSpinner } from './LoadingSpinner';
import Root from '../../app/Root';

describe('LoadingSpinner tests', () => {
  const history = createMemoryHistory();

  render(
    <Router history={history}>
      <Root>
        <LoadingSpinner loadingText="Loading..." />
      </Root>
    </Router>,
  );

  it('has the correct icon and title ', () => {
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});
