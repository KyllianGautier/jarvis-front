import { Injectable } from '@angular/core';

const TOKEN_KEY = 'jarvis-token';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  public storeToken(authentication: SignInResponse): void {
    window.localStorage.setItem(TOKEN_KEY, JSON.stringify(authentication));
  }

  public getToken(): string {
    return this.getStoredAuthentication().token;
  }

  public isAdministrator(): boolean {
    return this.getStoredAuthentication().admin;
  }

  public getUser(): User {
    return this.getStoredAuthentication().user;
  }

  public setUser(user: User): void {
    const auth = this.getStoredAuthentication();
    if (auth) {
      auth.user = user;
      window.localStorage.setItem(TOKEN_KEY, JSON.stringify(auth));
    }
  }

  public removeToken(): void {
    window.localStorage.removeItem(TOKEN_KEY);
  }

  public isTokenStored(): boolean {
    return window.localStorage.getItem(TOKEN_KEY) !== null;
  }

  private getStoredAuthentication(): SignInResponse {
    return JSON.parse(window.localStorage.getItem(TOKEN_KEY));
  }
}
