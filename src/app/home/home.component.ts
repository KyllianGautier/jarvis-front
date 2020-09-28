import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import {AuthenticationService} from '../shared/services/authentication/authentication.service';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public signedInUser: User;

  public navItems: MenuItem[];

  public userMenuItems: MenuItem[];

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.signedInUser = this.authenticationService.getSignedInUser();

    this.navItems = [
      { label: 'home.header.navMenu.notes', routerLink: 'notes', icon: 'pi pi-pencil' },
      { label: 'home.header.navMenu.tasks', routerLink: 'tasks', icon: 'pi pi-check-circle' },
      { label: 'home.header.navMenu.to-watch', routerLink: 'to-watch', icon: 'pi pi-desktop' },
      { label: 'home.header.navMenu.administration', routerLink: 'administration', icon: 'pi pi-briefcase' }
    ];

    this.userMenuItems = [
      { label: 'Paramètres', routerLink: '', icon: 'pi pi-cog', command: () => this.router.navigate(['/profile']) },
      { label: 'Déconnexion', routerLink: '', icon: 'pi pi-sign-out', command: () => this.signOut() },
    ];
  }

  public signOut(): void {
    this.authenticationService.signOut();
    this.router.navigate(['/login']);
  }
}
