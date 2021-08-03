import { get } from "./BackendService";
import { PdaLookupResponse } from "../types/Hatters";
import { config } from "../app.config";

export const pdaLookupWithEmail = (email: string) => {
  return get<PdaLookupResponse>(`${config.links.hatters}/api/hat/lookup?email=${email}`);
};
