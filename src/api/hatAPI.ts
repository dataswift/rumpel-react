import {get, post} from '../services/BackendService';

export const userAccessToken = (username: string, password: string) => {
  const path = `http://bobtheplumber.hat.org:9000/users/access_token`;
  const headers = {
    username: encodeURIComponent(username),
    password: encodeURIComponent(password),
  };

  return get<{ accessToken: string }>(path, { headers: headers });
};

export const recoverPassword = (body: { email: string; }) => {
  const path = `/control/v2/auth/passwordReset`;
  const headers = { 'Content-Type': 'application/json' };

return post(path, body, { headers: headers });
};
