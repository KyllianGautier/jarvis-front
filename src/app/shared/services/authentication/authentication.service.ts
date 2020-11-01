import { Injectable } from '@angular/core';
import { TokenStorageService } from './token-storage/token-storage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiPaths } from 'src/app/shared/constants/api-paths';
import { map } from 'rxjs/operators';

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
    return this.http.post<any>(apiPaths.API_PATH + apiPaths.AUTHENTICATION_SIGN_UP, signUpRequest);
  }

  public checkEmailValidity(email: string): Observable<boolean> {
    return this.http.post<boolean>(apiPaths.API_PATH + apiPaths.AUTHENTICATION_CHECK_EMAIL_VALIDITY, { email });
  }

  public getSignUpRequests(): Observable<SignUpRequest[]> {
    return this.http.get<SignUpRequest[]>(
      apiPaths.API_PATH + apiPaths.AUTHENTICATION_SIGN_UP_REQUEST,
      { headers: this.getAuthorizationHeader() }
      );
  }

  public acceptSignUpRequest(idSignUpRequest: number): Observable<any> {
    return this.http.post<any>(
      apiPaths.API_PATH + apiPaths.AUTHENTICATION_SIGN_UP_REQUEST + '/' + idSignUpRequest + '/accept',
      {},
      { headers: this.getAuthorizationHeader() }
      );
  }

  public rejectSignUpRequest(idSignUpRequest: number): Observable<any> {
    return this.http.post<any>(
      apiPaths.API_PATH + apiPaths.AUTHENTICATION_SIGN_UP_REQUEST + '/' + idSignUpRequest + '/reject',
      {},
      { headers: this.getAuthorizationHeader() }
    );
  }

  public checkTokenValidity(email: string, token: string): Observable<boolean> {
    return this.http.post<boolean>(apiPaths.API_PATH + apiPaths.AUTHENTICATION_CHECK_TOKEN_VALIDITY, { email, token });
  }

  public getNewAccountActivationToken(email: string): Observable<void> {
    return this.http.post<null>(apiPaths.API_PATH + apiPaths.AUTHENTICATION_NEW_TOKEN, { email });
  }

  public activateAccount(activationData: any): Observable<void> {
    return this.http.post<void>(apiPaths.API_PATH + apiPaths.AUTHENTICATION_ACTIVATE_ACCOUNT, activationData);
  }

  public signIn(signInRequest: SignInRequest): Observable<SignInResponse> {
    return this.http.post<SignInResponse>(apiPaths.API_PATH + apiPaths.AUTHENTICATION_SIGN_IN, signInRequest)
      .pipe(
        map(authentication => {
          this.tokenStorageService.storeToken(authentication);
          return authentication;
        })
      );
  }

  public isSignedIn(): boolean {
    return this.tokenStorageService.isTokenStored();
  }

  public getSignedInUser(): User {
    return this.tokenStorageService.getUser();
  }

  public isSignedInUserAdministrator() {
    return this.tokenStorageService.isAdministrator();
  }

  public signOut(): void {
    this.tokenStorageService.removeToken();
  }
}
