import { get } from '../services/BackendService';

export const userAccessToken = (username: string, password: string) => {
  const path = `http://bobtheplumber.hat.org:9000/users/access_token`;
  const headers = {
    username: encodeURIComponent(username),
    password: encodeURIComponent(password),
  };

  return get<{ accessToken: string }>(path, { headers: headers });
};
