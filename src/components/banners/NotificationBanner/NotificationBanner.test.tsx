import { createMemoryHistory } from 'history';
import { Router } from 'react-router';
import Root from '../../../app/Root';
import React from 'react';
import { NotificationBanner } from './NotificationBanner';
import { render, screen } from '@testing-library/react';

describe('NotificationBanner tests', () => {
  const history = createMemoryHistory();

  render(
    <Router history={history}>
      <Root>
        <NotificationBanner type={'error'} display={true}>
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
