import * as React from 'react';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router';

import AuthLogin from './AuthLogin';
import Root from '../../app/Root';

import { userAccessToken } from '../../api/hatAPI';
jest.mock('../../api/hatAPI');

const mockUserAccessToken: jest.Mocked<any> = userAccessToken;

describe('AuthLogin', () => {
  test('user can attempt a password login', async () => {
    mockUserAccessToken.mockResolvedValueOnce({});
    const history = createMemoryHistory();

    render(
      <Router history={history}>
        <Root>
          <AuthLogin />
        </Root>
      </Router>,
    );

    const passwordInput = screen.getByLabelText('password');
    expect(passwordInput).toBeInTheDocument();

    const nextButton = screen.getByRole('button', { name: 'Next Button' });
    expect(nextButton).toBeInTheDocument();
    expect(nextButton).toBeDisabled();

    fireEvent.change(passwordInput, { target: { value: 'testPass' } });
    fireEvent.click(nextButton);

    await waitFor(() => expect(mockUserAccessToken).toHaveBeenCalledTimes(1));
    expect(mockUserAccessToken).toHaveBeenCalledWith('', 'testPass');
  });
});
