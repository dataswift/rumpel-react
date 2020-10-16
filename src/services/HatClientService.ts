import { HatClient } from '@dataswift/hat-js';
import { get, post } from './BackendService';
import { HatApplication } from '@dataswift/hat-js/lib/interfaces/hat-application.interface';
import { HatTokenValidation } from "@dataswift/hat-js/lib/utils/HatTokenValidation";
import { HatTool } from "../features/tools/hat-tool.interface";
import { DataSourcesInterface } from "../features/universal-data-viewer/DataSources.interface";
import { HatHttpParameters } from "@dataswift/hat-js/lib/interfaces/http.interface";
import { HatApplicationContent } from "hmi/dist/interfaces/hat-application.interface";

export class HatClientService {
  private readonly pathPrefix = '/api/v2.6';
  private static instance: HatClientService;
  private hat: HatClient;
  private secure = false;

  private constructor(token?: string) {
    if (token) {
      const decodedToken = HatTokenValidation.decodeToken(token);
      this.secure = window.location.protocol === 'https:' || decodedToken['iss']?.indexOf(':') === -1;
      this.hat = new HatClient({ token: token || '', secure: this.secure, apiVersion: 'v2.6' });
    } else {
      this.hat = new HatClient({ apiVersion: 'v2.6' });
    }
  }

  public static getInstance(token?: string): HatClientService {
    if (!HatClientService.instance) {
      HatClientService.instance = new HatClientService(token);
    }

    if (token) {
      HatClientService.instance = new HatClientService(token);
    }

    return HatClientService.instance;
  }

  public logout() {
    return this.hat.auth().signOut();
  }

  public async getApplications() {
    return await this.hat.applications().getAllDefault();
  }

  public async getApplicationById(appId: string) {
    return await this.hat.applications().getById(appId);
  }

  public async setupApplication(applicationId: string) {
    const token = this.hat.auth().getToken();
    const hatdomain = this.hat.auth().getHatDomain();

    if (!token) return;

    const path = `${ hatdomain }${ this.pathPrefix }/applications/${ applicationId }/setup`;

    return get<HatApplication>(path, { method: 'get', headers: { 'x-auth-token': token } });
  }

  public async getApplicationHmi(applicationId: string) {
    const path = `${ this.pathPrefix }/applications/${ applicationId }/hmi`;

    return get<HatApplicationContent>(path);
  }

  public isTokenExpired(token: string) {
    try {
      return this.hat.auth().isTokenExpired(token);
    } catch (e) {
      return true;
    }
  }

  public async getApplicationsHmi(applicationId: string) {
    const token = this.hat.auth().getToken();
    const hatdomain = this.hat.auth().getHatDomain();

    if (!token) return;

    const path = `${ hatdomain }${ this.pathPrefix }/applications/hmi?applicationId=${ applicationId }`;

    return get<HatApplication[]>(path, { method: 'get', headers: { 'x-auth-token': token } });
  }

  public async sendReport(actionCode: string, message?: string) {
    const token = this.hat.auth().getToken();
    const hatdomain = this.hat.auth().getHatDomain();

    if (!token) return;

    const path = `${ hatdomain }${ this.pathPrefix }/report-frontend-action`;
    const body = { actionCode: actionCode, message: message };

    return post<HatApplication[]>(
      path,
      {},
      {
        method: 'post',
        body: JSON.stringify(body),
        headers: { 'x-auth-token': token, 'content-type': 'application/json' },
      }
    );
  }

  public async appLogin(applicationId: string) {
    const token = this.hat.auth().getToken();
    const hatdomain = this.hat.auth().getHatDomain();

    if (!token) return;

    const path = `${ hatdomain }${ this.pathPrefix }/applications/${ applicationId }/access-token`;

    return get<{ accessToken: string }>(path, { method: 'get', headers: { 'x-auth-token': token } });
  }

  public async getTools(toolId?: string) {
    const token = this.hat.auth().getToken();
    const hatdomain = this.hat.auth().getHatDomain();

    if (!token) return;

    let path = `${ hatdomain }${ this.pathPrefix }/she/function`;
    
    if (toolId) {
      path += `/${ toolId }`;
    }

    return get<HatTool[]>(path, { method: 'get', headers: { 'x-auth-token': token } });
  }

  public async enableTool(toolId: string) {
    const token = this.hat.auth().getToken();
    const hatdomain = this.hat.auth().getHatDomain();

    if (!token) return;

    const path = `${ hatdomain }${ this.pathPrefix }/she/function/${ toolId }/enable`;

    return get<HatTool>(path, { method: 'get', headers: { 'x-auth-token': token } });
  }

  public async triggerToolUpdate(toolId: string) {
    const token = this.hat.auth().getToken();
    const hatdomain = this.hat.auth().getHatDomain();

    if (!token) return;

    const path = `${ hatdomain }${ this.pathPrefix }/she/function/${ toolId }/trigger`;

    return get(path, { method: 'get', headers: { 'x-auth-token': token } });
  }

  public async getDataSources() {
    const token = this.hat.auth().getToken();
    const hatdomain = this.hat.auth().getHatDomain();

    if (!token) return;

    const path = `${ hatdomain }${ this.pathPrefix }/data/sources `;

    return get<DataSourcesInterface>(path, { method: 'get', headers: { 'x-auth-token': token } });
  }

  public async getData<T>(namespace: string, endpoint: string, options: HatHttpParameters) {
    return await this.hat.hatData().getAll<T>(namespace, endpoint, options);
  }
}
