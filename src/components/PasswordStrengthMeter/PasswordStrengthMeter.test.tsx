import { createMemoryHistory } from 'history';
import { Router } from 'react-router';
import React from 'react';
import Root from '../../app/Root';
import { PasswordStrengthMeter } from './PasswordStrengthMeter';
import { render, screen } from '@testing-library/react';

describe('PasswordStrengthMeter', () => {
  const history = createMemoryHistory();

  it('has the correct message when score is 0', () => {
    render(
      <Router history={history}>
        <Root>
          <PasswordStrengthMeter passwordStrength={{ score: 0 }} />
        </Root>
      </Router>,
    );

    expect(screen.getByText('Too weak')).toBeInTheDocument();
  });

  it('has the correct message when score is 1', () => {
    render(
      <Router history={history}>
        <Root>
          <PasswordStrengthMeter passwordStrength={{ score: 1 }} />
        </Root>
      </Router>,
    );

    expect(screen.getByText('Too weak')).toBeInTheDocument();
  });

  it('has the correct message when score is 2', () => {
    render(
      <Router history={history}>
        <Root>
          <PasswordStrengthMeter passwordStrength={{ score: 2 }} />
        </Root>
      </Router>,
    );

    expect(screen.getByText('So-so')).toBeInTheDocument();
  });

  it('has the correct message when score is 3', () => {
    render(
      <Router history={history}>
        <Root>
          <PasswordStrengthMeter passwordStrength={{ score: 3 }} />
        </Root>
      </Router>,
    );

    expect(screen.getByText('Strong')).toBeInTheDocument();
  });

  it('has the correct message when score is 4', () => {
    render(
      <Router history={history}>
        <Root>
          <PasswordStrengthMeter passwordStrength={{ score: 4 }} />
        </Root>
      </Router>,
    );

    expect(screen.getByText('Very Strong')).toBeInTheDocument();
  });
});
