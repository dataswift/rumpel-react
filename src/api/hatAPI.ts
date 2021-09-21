import { get, post } from '../services/BackendService';
import { BundleValues } from '@dataswift/hat-js/lib/interfaces/bundle.interface';
import { HatClient } from '@dataswift/hat-js';
import { HatClaimApiResponse, HatClaimRequest } from '../features/hat-claim/hat-claim.interface';

export const userAccessToken = (username: string, password: string) => {
  const path = `/users/access_token`;
  const headers = {
    username: encodeURIComponent(username),
    password: encodeURIComponent(password),
  };

  return get<{ accessToken: string }>(path, { headers: headers });
};

export const newUserAccessToken = (pda: string, username: string, password: string) => {
  const path = `https://${pda}/users/access_token`;
  const headers = {
    username: encodeURIComponent(username),
    password: encodeURIComponent(password),
  };

  return get<{ accessToken: string }>(path, { headers: headers });
};

export const recoverPassword = (body: { email: string }) => {
  const path = `/control/v2/auth/passwordReset`;
  const headers = { 'Content-Type': 'application/json' };

  //todo create new post function to accept headers, body
  return post(path, {}, { method: 'post', headers: headers, body: JSON.stringify(body) });
};

export const getPublicProfile = (path: string) => {
  const headers = { 'Content-Type': 'application/json' };

  return get<BundleValues>(path, { method: 'get', headers });
};

export const resetPassword = (pda: string, resetToken: string, body: { newPassword: string }) => {
  const path = `https://${pda}/control/v2/auth/passwordreset/confirm/${resetToken}`;
  const headers = { 'Content-Type': 'application/json' };

  return post(path, {}, { method: 'post', headers: headers, body: JSON.stringify(body) });
};

export const changePassword = (body: { password: string; newPassword: string }) => {
  const path = `/control/v2/auth/password`;
  const headers = { 'Content-Type': 'application/json' };

  return post(path, {}, { method: 'post', headers: headers, body: JSON.stringify(body) });
};

export const getDataDebits = (client: HatClient) => {
  return client.dataDebits().getAllDefault();
};

export const verifyEmail = (claimToken: string, body: HatClaimRequest) => {
  const path = `https://${body.hatName + '.' + body.hatCluster}/control/v2/auth/claim/complete/${claimToken}`;
  const args: RequestInit = {
    method: 'post',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  };

  return post<HatClaimApiResponse>(path, body, args);
};
