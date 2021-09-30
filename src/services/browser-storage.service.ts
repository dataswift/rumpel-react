const TOKEN_NAME = 'token';

export class BrowserStorageService {
  private remember = false;

  private sessionStoreAvailable = false;

  private localStoreAvailable = false;

  static testSessionStorage(): boolean {
    const test = 'test';
    try {
      sessionStorage.setItem(test, test);
      sessionStorage.removeItem(test);

      return true;
    } catch (e) {
      return false;
    }
  }

  static testLocalStorage(): boolean {
    const test = 'test';
    try {
      localStorage.setItem(test, test);
      localStorage.removeItem(test);

      return true;
    } catch (e) {
      return false;
    }
  }

  constructor() {
    this.sessionStoreAvailable = BrowserStorageService.testSessionStorage();
    this.localStoreAvailable = BrowserStorageService.testLocalStorage();
  }

  set rememberMe(remember: boolean) {
    this.remember = remember;
  }

  getAuthToken(): string {
    return sessionStorage.getItem(TOKEN_NAME) || '';
  }

  setAuthToken(token: string) {
    if (this.remember) {
      // this.cookieSvc.set(TOKEN_NAME, token, null, null, null, true, 'Strict');
    } else if (this.sessionStoreAvailable) {
      sessionStorage.setItem(TOKEN_NAME, token);
    }
  }

  getItem(key: string): string | null {
    if (this.localStoreAvailable) {
      return JSON.parse(localStorage.getItem(key) || '');
    }
    return null;
  }

  setItem(key: string, data: any): boolean {
    if (this.localStoreAvailable) {
      localStorage.setItem(key, JSON.stringify(data));

      return true;
    }
    return false;
  }

  removeItem(key: string): boolean {
    if (this.localStoreAvailable) {
      localStorage.removeItem(key);

      return true;
    }
    return false;
  }
}
