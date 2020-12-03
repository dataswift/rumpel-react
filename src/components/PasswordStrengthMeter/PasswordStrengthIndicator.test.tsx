import { createMemoryHistory } from "history";
import { Router } from "react-router";
import React from "react";
import Root from "../../app/Root";
import { PasswordStrengthIndicator } from "./PasswordStrengthIndicator";
import { render, waitFor, screen } from "@testing-library/react";

describe('PasswordStrengthIndicator tests', () => {
  it('has the correct message when password is strong and match',  async () => {
    const history = createMemoryHistory();

    render(
      <Router history={history}>
        <Root>
          <PasswordStrengthIndicator strong={true} passwordMatch={true} />
        </Root>
      </Router>
    );

    await waitFor(() => expect(screen.getByText('Passwords match!')).toBeInTheDocument());
  });

  it('doesn\'t have a message suggestion when password is strong', async () => {
    const history = createMemoryHistory();

    render(
      <Router history={history}>
        <Root>
          <PasswordStrengthIndicator strong={true} passwordMatch={false} />
        </Root>
      </Router>
    );

    await waitFor(() => expect(screen.queryByText('Passwords match!')).toBeNull());
  });

  it('has the correct message when password isn\'t strong but match', async () => {
    const history = createMemoryHistory();

    render(
      <Router history={history}>
        <Root>
          <PasswordStrengthIndicator strong={false} passwordMatch={true} />
        </Root>
      </Router>
    );

    await waitFor(() => expect(screen.getByText('Password must be stronger.*')).toBeInTheDocument());
  });

  it('has the correct message when password is strong but don\'t match', async () => {
    const history = createMemoryHistory();

    render(
      <Router history={history}>
        <Root>
          <PasswordStrengthIndicator strong={true} passwordMatch={false} />
        </Root>
      </Router>
    );

    await waitFor(() => expect(screen.getByText('Passwords do not match.')).toBeInTheDocument());
  });

  it('has the correct message when password isn\'t strong and don\'t match', async () => {
    const history = createMemoryHistory();

    render(
      <Router history={history}>
        <Root>
          <PasswordStrengthIndicator strong={false} passwordMatch={false} />
        </Root>
      </Router>
    );

    await waitFor(() => expect(screen.getByText('Password must be stronger.*')).toBeInTheDocument());
  });
});
