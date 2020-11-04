import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiPaths } from '../../constants/api-paths';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService
  ) { }

  public getUserDevices(): Observable<UserDevice[]> {
    return this.http.get<UserDevice[]>(
      apiPaths.API_PATH + apiPaths.USERS_DEVICES,
      { headers: this.authenticationService.getAuthorizationHeader() }
    );
  }

  public getUser(): Observable<User> {
    return this.http.get<User>(
      apiPaths.API_PATH + apiPaths.USERS_USER,
      { headers: this.authenticationService.getAuthorizationHeader() }
    );
  }
}
