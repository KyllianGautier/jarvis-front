import { Injectable } from '@angular/core';
import User from '../../../models/entities/User';
import SignInResponse from '../../../models/responses/SignInResponse';

const TOKEN_KEY = 'jarvis-token';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  public storeToken(auth: SignInResponse): void {
    window.localStorage.setItem(TOKEN_KEY, JSON.stringify(auth));
  }

  public getToken(): string {
    const session = window.localStorage.getItem(TOKEN_KEY);
    return (session) ? JSON.parse(session).token : session;
  }

  public getUser(): User {
    return JSON.parse(
      window.localStorage
        .getItem(TOKEN_KEY)
    ).user;
  }

  public setUser(user: User): void {
    const auth = JSON.parse(window.localStorage.getItem(TOKEN_KEY));
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
}
