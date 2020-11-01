import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthenticationService } from '../shared/services/authentication/authentication.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { appPaths } from '../shared/constants/app-paths';
import { appConstants } from '../shared/constants/app-constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public appName: string;

  public signedInUser: User;
  public navItems: MenuItem[];
  public userMenuItems: MenuItem[];

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private translate: TranslateService
  ) {
    this.appName = appConstants.APP_NAME;
  }

  ngOnInit() {
    this.signedInUser = this.authenticationService.getSignedInUser();

    this.navItems = [
      { label: 'home.header.navMenu.notes', routerLink: 'notes', icon: 'pi pi-pencil' },
      { label: 'home.header.navMenu.tasks', routerLink: 'tasks', icon: 'pi pi-check-circle' },
      { label: 'home.header.navMenu.to-watch', routerLink: 'to-watch', icon: 'pi pi-desktop' }
    ];

    if (this.authenticationService.isSignedInUserAdministrator()) {
      this.navItems.push({ label: 'home.header.navMenu.administration', routerLink: 'administration', icon: 'pi pi-briefcase' });
    }

    this.userMenuItems = [
      {
        label: this.translate.instant('home.header.userMenu.settings'),
        routerLink: '', icon: 'pi pi-cog', command: () => this.router.navigate(['/profile'])
      },
      {
        label: this.translate.instant('home.header.userMenu.signOut'),
        routerLink: '', icon: 'pi pi-sign-out', command: () => this.signOut()
      },
    ];
  }

  public signOut(): void {
    this.authenticationService.signOut();
    this.router.navigate([appPaths.LOGIN]);
  }
}
