import * as React from 'react';

import { screen, render } from '@testing-library/react';
import { InfoHeader } from './InfoHeader';
import Root from "../../../app/Root";
import { Router } from "react-router";
import { createMemoryHistory } from "history";

describe('InfoHeader', () => {
  const history = createMemoryHistory();

  test('renders the InfoHeader component and ensures the correct details are displayed', () => {
    render(
      <Root>
        <Router history={history}>
          <InfoHeader />
        </Router>
      </Root>);

    expect(screen.getByText('Sign In')).toBeInTheDocument();
    expect(screen.getByText('Get a hat')).toBeInTheDocument();
    expect(screen.getByAltText('HAT Logo')).toBeInTheDocument();
  });
});
