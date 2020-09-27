import { Injectable } from '@angular/core';
import { TokenStorageService } from './token-storage/token-storage.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { paths } from 'src/app/shared/constants/api-paths';
import SignInResponse from '../../models/responses/SignInResponse';
import {map} from 'rxjs/operators';
import User from '../../models/entities/User';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private http: HttpClient,
    private tokenStorageService: TokenStorageService
  ) { }

  public getAuthorizationHeader(): HttpHeaders {
    return new HttpHeaders({ Authorization: 'Bearer ' + this.tokenStorageService.getToken() });
  }

  public signUp(signUpRequest: any): Observable<any> {
    return this.http.post<any>(paths.API_PATH + paths.AUTHENTICATION_SIGN_UP, signUpRequest);
  }

  public acceptSignUpRequest(idSignUpRequest: number): Observable<any> {
    return this.http.post<any>(
      paths.API_PATH + paths.AUTHENTICATION_SIGN_UP_REQUEST + '/' + idSignUpRequest + '/accept',
      {},
      { headers: this.getAuthorizationHeader() }
      );
  }

  public rejectSignUpRequest(idSignUpRequest: number): Observable<any> {
    return this.http.post<any>(
      paths.API_PATH + paths.AUTHENTICATION_SIGN_UP_REQUEST + '/' + idSignUpRequest + '/reject',
      {},
      { headers: this.getAuthorizationHeader() }
    );
  }

  public signIn(signInRequest: any): Observable<SignInResponse> {
    return this.http.post<SignInResponse>(paths.API_PATH + paths.AUTHENTICATION_SIGN_IN, signInRequest)
      .pipe(
        map(auth => {
          this.tokenStorageService.storeToken(auth);
          return auth;
        })
      );
  }

  public isSignedIn(): boolean {
    return this.tokenStorageService.isTokenStored();
  }

  public getSignedInUser(): User {
    return this.tokenStorageService.getUser();
  }

  public signOut(): void {
    this.tokenStorageService.removeToken();
  }
}
