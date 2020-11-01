import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot} from '@angular/router';
import {AuthenticationService} from '../services/authentication/authentication.service';
import {Injectable} from '@angular/core';
import { appPaths} from '../constants/app-paths';

@Injectable({
  providedIn: 'root'
})
export class AdministratorGuard implements CanActivate, CanActivateChild {

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.authenticationService.isSignedInUserAdministrator()) {
      this.router.navigate([appPaths.HOME]);
      return false;
    }
    return true;
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(childRoute, state);
  }
}
