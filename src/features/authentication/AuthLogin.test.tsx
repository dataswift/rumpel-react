import * as React from 'react';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router';

import AuthLogin from './AuthLogin';
import Root from '../../app/Root';

import { newUserAccessToken } from '../../api/hatAPI';
import { pdaLookupWithEmail } from "../../services/HattersService";
jest.mock('../../api/hatAPI');
jest.mock('../../services/HattersService');

const mockUserAccessToken: jest.Mocked<any> = newUserAccessToken;
const mockPdaLookupWithEmail: jest.Mocked<any> = pdaLookupWithEmail;

describe('AuthLogin', () => {
  test('user can attempt a password login', async () => {
    mockPdaLookupWithEmail.mockResolvedValueOnce({
      parsedBody: {
        verified: false,
        hatCluster: 'testHatCluster',
        hatName: 'testHatName'
      }
    });
    mockUserAccessToken.mockResolvedValueOnce({});
    const history = createMemoryHistory();

    history.push("/", { query: { email: 'test@email.com' } });
    render(
      <Router history={history}>
        <Root>
          <AuthLogin />
        </Root>
      </Router>,
    );

    await waitFor(() => fireEvent.change(screen.getByLabelText('password'), { target: { value: 'testPass' } }));
    await waitFor(() => fireEvent.click(screen.getByRole('button', { name: 'Next Button' })));

    await waitFor(() => expect(mockPdaLookupWithEmail).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(mockUserAccessToken).toHaveBeenCalledTimes(1));
    expect(mockUserAccessToken).toHaveBeenCalledWith('testHatName.testHatCluster', 'testHatName', 'testPass');
  });
});
