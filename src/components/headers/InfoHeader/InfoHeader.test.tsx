import * as React from 'react';

import { screen, render, fireEvent } from '@testing-library/react';
import { InfoHeader } from './InfoHeader';
import Root from '../../../app/Root';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';
import { environment } from '../../../environment';

describe('InfoHeader', () => {
  const history = createMemoryHistory();

  test('renders the InfoHeader component and ensures the correct details are displayed', () => {
    history.push('/public/profile');

    render(
      <Root>
        <Router history={history}>
          <InfoHeader />
        </Router>
      </Root>,
    );

    expect(screen.getByText('Sign In')).toBeInTheDocument();
    expect(screen.getByText('Get a hat')).toBeInTheDocument();
    expect(screen.getByAltText('HAT Logo')).toBeInTheDocument();
  });

  test('the correct location is called when the user clicks on the sign in button', () => {
    history.push('/public/profile');

    render(
      <Root>
        <Router history={history}>
          <InfoHeader />
        </Router>
      </Root>,
    );

    fireEvent.click(screen.getByText('Sign In'));

    expect(history.location.pathname).toEqual('/user/login');
  });

  test('the correct location is called when the user clicks on the Get a hat button', () => {
    history.push('/public/profile');

    render(
      <Root>
        <Router history={history}>
          <InfoHeader />
        </Router>
      </Root>,
    );

    expect(screen.getByText('Get a hat').getAttribute('href')).toEqual(environment.hattersFrontendUrl + '/hat/signup');
  });
});
