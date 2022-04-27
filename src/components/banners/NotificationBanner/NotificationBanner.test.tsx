import { createMemoryHistory } from 'history';
import { Router } from 'react-router';
import React from 'react';
import { render, screen } from '@testing-library/react';
import Root from '../../../app/Root';
import { NotificationBanner } from './NotificationBanner';

describe('NotificationBanner tests', () => {
  const history = createMemoryHistory();

  render(
    <Router history={history}>
      <Root>
        <NotificationBanner type="error" display>
          An error message
        </NotificationBanner>
      </Root>
    </Router>,
  );

  it('has the correct icon and title ', () => {
    expect(screen.getByText('warning')).toBeInTheDocument();
    expect(screen.getByText('An error message')).toBeInTheDocument();
  });
});
