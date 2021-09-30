import { get, http } from './BackendService';
import { PdaLookupResponse, PdaSignup } from '../types/Hatters';
import { config } from '../app.config';
import { HatApplicationContent } from "hmi/dist/interfaces/hat-application.interface";
import { HatTool } from "../features/tools/hat-tool.interface";
import { buildRequestURL } from "../utils/utils";
import { environment } from "../environment";

export const pdaLookupWithEmail = (email: string) => {
  return get<PdaLookupResponse>(
    // eslint-disable-next-line max-len
    `${config.links.hattersBackend}/api/hat/lookup?email=${encodeURIComponent(email)}&sandbox=${environment.sandbox ? 'true' : 'false'}`,
  );
};

export const getPdaAuthApplicationById = (applicationId: string, lang: string = 'en') => {
  return get<HatApplicationContent>(
    `${config.links.hattersBackend}/api/applications/${applicationId}?lang=${lang}`,
  );
};

export const getPdaAuthFunctionById = (functionId: string) => {
  return get<HatTool>(
    `${config.links.hattersBackend}/api/functions/${functionId}`,
  );
};

export const createPdaAuthUser = async (signup: PdaSignup, lang?: string | null, skipDeps?: string | null) => {
  let params: { [key: string]: string } = {};

  if (lang) {
    params['lang'] = lang;
  }

  if (skipDeps) {
    params['skipDeps'] = skipDeps;
  }

  const url = buildRequestURL(`${config.links.hattersBackend}/api/services/daas/signup`, params);

  const args: RequestInit = {
    method: 'POST',
    body: JSON.stringify(signup),
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  };

  return http<PdaSignup>(new Request(url, args));
};

export const resendVerificationEmail = async (email: string, redirectUri: string, sandbox: boolean = false) => {
  const url = `${config.links.hattersBackend}/api/services/daas/resend-verification`;

  const body = {
    email: email,
    sandbox: sandbox,
    redirectUri: redirectUri
  };

  const args: RequestInit = {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  };

  return http(new Request(url, args));
};
