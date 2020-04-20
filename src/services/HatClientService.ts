import { HatClient } from '@dataswift/hat-js';
import { get, post } from './BackendService';
import { HatApplication } from '@dataswift/hat-js/lib/interfaces/hat-application.interface';

export class HatClientService {
  private readonly pathPrefix = '/api/v2.6';
  private static instance: HatClientService;
  private hat: HatClient;
  private secure = location.protocol === 'https:';

  private constructor(token?: string) {
    if (token) {
      // todo handle the secure flag properly
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

    const path = `${hatdomain}${this.pathPrefix}/applications/${applicationId}/setup`;

    return get<HatApplication>(path, { method: 'get', headers: { 'x-auth-token': token } });
  }

  public isTokenExpired(token: string) {
    return this.hat.auth().isTokenExpired(token);
  }

  public async getApplicationHmi(applicationId: string) {
    const token = this.hat.auth().getToken();
    const hatdomain = this.hat.auth().getHatDomain();

    if (!token) return;

    const path = `${hatdomain}${this.pathPrefix}/applications/hmi?applicationId=${applicationId}`;

    return get<HatApplication[]>(path, { method: 'get', headers: { 'x-auth-token': token } });
  }

  public async sendReport(actionCode: string, message?: string) {
    const token = this.hat.auth().getToken();
    const hatdomain = this.hat.auth().getHatDomain();

    if (!token) return;

    const path = `${hatdomain}${this.pathPrefix}/report-frontend-action`;
    const body = { actionCode: actionCode, message: message };

    return post<HatApplication[]>(
      path,
      {},
      {
        method: 'post',
        body: JSON.stringify(body),
        headers: { 'x-auth-token': token, 'content-type': 'application/json' },
      },
    );
  }

  public async appLogin(applicationId: string) {
    const token = this.hat.auth().getToken();
    const hatdomain = this.hat.auth().getHatDomain();

    if (!token) return;

    const path = `${hatdomain}${this.pathPrefix}/applications/${applicationId}/access-token`;

    return get<{ accessToken: string }>(path, { method: 'get', headers: { 'x-auth-token': token } });
  }
}
