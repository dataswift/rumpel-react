import { get, post } from '../services/BackendService';
import { BundleValues } from "@dataswift/hat-js/lib/interfaces/bundle.interface";

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

export const getPublicProfile = () => {
  const path = `/api/v2.6/phata/profile`;
  const headers = { 'Content-Type': 'application/json' };

  return get<BundleValues>(path, { method: 'get', headers: headers });
};
