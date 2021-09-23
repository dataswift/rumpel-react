import { get } from './BackendService';
import { PdaLookupResponse } from '../types/Hatters';
import { config } from '../app.config';

export const pdaLookupWithEmail = (email: string) => {
  return get<PdaLookupResponse>(
    `${config.links.hattersBackend}/api/hat/lookup?email=${encodeURIComponent(email)}&sandbox=true`,
  );
};