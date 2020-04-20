import { get, post } from '../services/BackendService';

export const userAccessToken = (username: string, password: string) => {
  const path = `/users/access_token`;
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
