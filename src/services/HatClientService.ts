import { HatClient } from '@dataswift/hat-js';
import { get } from './BackendService';

export class HatClientService {
  private readonly pathPrefix = '/api/v2.6';
  private static instance: HatClientService;
  private hat: HatClient;

  private constructor(token?: string) {
    this.hat = new HatClient({ token: token || '', secure: false, apiVersion: 'v2.6' });
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

  public async setupApplication(appId: string) {
    return await this.hat.applications().setupApplication(appId);
  }

  public async appLogin(applicationId: string) {
    const token = this.hat.auth().getToken();
    const hatdomain = this.hat.auth().getHatDomain();

    if (!token) return;

    const path = `${hatdomain}${this.pathPrefix}/applications/${applicationId}/access-token`;

    return get<{ accessToken: string }>(path, { method: 'get', headers: { 'x-auth-token': token } });
  }
}
