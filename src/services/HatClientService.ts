import { HatClient } from '@dataswift/hat-js';
import { HatApplication } from '@dataswift/hat-js/lib/interfaces/hat-application.interface';
import { DataSourcesInterface } from '../features/universal-data-viewer/DataSources.interface';
import { HatHttpParameters } from '@dataswift/hat-js/lib/interfaces/http.interface';
import { get, post } from './BackendService';
import { HatTokenValidation } from '@dataswift/hat-js/lib/utils/HatTokenValidation';
import { HatTool } from '../features/tools/hat-tool.interface';
import { SystemStatusInterface } from '../features/system-status/system-status.interface';
import { Profile } from '../features/profile/profile.interface';
import { HatApplicationContent } from 'hmi/dist/interfaces/hat-application.interface';
import { SheFeed } from '../features/feed/she-feed.interface';
import { BundleStructure, PropertyQuery } from "@dataswift/hat-js/lib/interfaces/bundle.interface";
import { FileMetadataReq } from "@dataswift/hat-js/lib/interfaces/file.interface";
import { HatRecord } from "@dataswift/hat-js/lib/interfaces/hat-record.interface";
import { getPublicProfile, getDataDebits } from '../api/hatAPI';

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

    const path = `${hatdomain}${this.pathPrefix}/applications/${applicationId}/setup`;

    return get<HatApplication>(path, { method: 'get', headers: { 'x-auth-token': token } });
  }

  public async getApplicationHmi(applicationId: string) {
    const path = `${this.pathPrefix}/applications/${applicationId}/hmi`;

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

  public async getTools() {
    const token = this.hat.auth().getToken();
    const hatdomain = this.hat.auth().getHatDomain();

    if (!token) return;

    let path = `${hatdomain}${this.pathPrefix}/she/function`;

    return get<HatTool[]>(path, { method: 'get', headers: { 'x-auth-token': token } });
  }

  public async getTool(toolId: string) {
    const token = this.hat.auth().getToken();
    const hatdomain = this.hat.auth().getHatDomain();

    if (!token) return;

    let path = `${hatdomain}${this.pathPrefix}/she/function/${toolId}`;

    return get<HatTool>(path, { method: 'get', headers: { 'x-auth-token': token } });
  }

  public async enableTool(toolId: string) {
    const token = this.hat.auth().getToken();
    const hatdomain = this.hat.auth().getHatDomain();
    if (!token) return;

    const path = `${hatdomain}${this.pathPrefix}/she/function/${toolId}/enable`;

    return get<HatTool>(path, { method: 'get', headers: { 'x-auth-token': token } });
  }

  public async disableTool(toolId: string) {
    const token = this.hat.auth().getToken();
    const hatdomain = this.hat.auth().getHatDomain();
    if (!token) return;

    const path = `${hatdomain}${this.pathPrefix}/she/function/${toolId}/disable`;

    return get<HatTool>(path, { method: 'get', headers: { 'x-auth-token': token } });
  }

  public async triggerToolUpdate(toolId: string) {
    const token = this.hat.auth().getToken();
    const hatdomain = this.hat.auth().getHatDomain();

    if (!token) return;

    const path = `${hatdomain}${this.pathPrefix}/she/function/${toolId}/trigger`;

    return get(path, { method: 'get', headers: { 'x-auth-token': token } });
  }

  public async getDataSources() {
    const token = this.hat.auth().getToken();
    const hatdomain = this.hat.auth().getHatDomain();

    if (!token) return;
    const path = `${hatdomain}${this.pathPrefix}/data/sources `;

    return get<DataSourcesInterface>(path, { method: 'get', headers: { 'x-auth-token': token } });
  }

  public async getData<T>(namespace: string, endpoint: string, options: HatHttpParameters) {
    return await this.hat.hatData().getAll<T>(namespace, endpoint, options);
  }
  public async getSystemStatusRecords() {
    const token = this.hat.auth().getToken();
    const hatdomain = this.hat.auth().getHatDomain();

    if (!token) return;

    const path = `${hatdomain}${this.pathPrefix}/system/status`;

    return get<SystemStatusInterface[]>(path, { method: 'get', headers: { 'x-auth-token': token } });
  }

  public async getProfileData() {
    const options = { orderBy: 'dateCreated', ordering: 'descending', take: '1' };

    return this.hat.hatData().getAll<Profile>('rumpel', 'profile', options);
  }

  public async postProfileData(profile: HatRecord<Profile>) {
    return this.hat.hatData().update<Profile>([profile]);
  }

  public async getSheRecords(endpoint?: string, since?: number | string, until?: number | string) {
    const token = this.hat.auth().getToken();
    const hatdomain = this.hat.auth().getHatDomain();

    if (!token) return;

    let path = `${hatdomain}${this.pathPrefix}/she/feed`;

    if (since) {
      path += `?since=${since.toString()}`;
    }

    if (until) {
      path += `&until=${until.toString()}`;
    }

    return get<SheFeed[]>(path, { method: 'get', headers: { 'x-auth-token': token } });
  }

  public async disableApplication(applicationId: string) {
    return get<HatApplication>(`${this.pathPrefix}/applications/${applicationId}/disable`);
  }

  public async getPublicProfile() {
    const path = `${this.pathPrefix}/phata/profile`;
    return getPublicProfile(path);
  }

  public async getDataBundleStructure(bundleId: string) {
    const token = this.hat.auth().getToken();
    const hatdomain = this.hat.auth().getHatDomain();

    if (!token) return;

    const path = `${hatdomain}${this.pathPrefix}/data-bundle/${bundleId}/structure`;

    return get<BundleStructure>(path, { method: 'get', headers: { 'x-auth-token': token } });
  }

  public async postDataBundleStructure(bundleId: string, bundle: { [bundleVersion: string]: PropertyQuery }) {
    const token = this.hat.auth().getToken();
    const hatdomain = this.hat.auth().getHatDomain();

    if (!token) return;

    const path = `${hatdomain}${this.pathPrefix}/data-bundle/${bundleId}`;

    return post<BundleStructure>(
      path, 
      {},  
      {
        method: 'post',
        body: JSON.stringify(bundle),
        headers: { 'x-auth-token': token, 'content-type': 'application/json' } }
    );
  }

  public async uploadFile(meta: FileMetadataReq, file: ArrayBuffer, fileType: string) {
    return this.hat.files().uploadFile(meta, file, fileType);
  }

  public async markFilesAsPublic(fileId: string) {
    return this.hat.files().markFileAsPublic(fileId);
  }

  public generateFileContentUrl(fileId: string) {
    return this.hat.files().generateFileContentUrl(fileId);
  }
  public async getDataDebits() {
    const token = this.hat.auth().getToken() || '';
    return getDataDebits(this.hat, token);
  }
}
