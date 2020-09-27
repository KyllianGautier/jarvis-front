import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import {AuthenticationService} from '../shared/services/authentication/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public navItems: MenuItem[];

  public userMenuItems: MenuItem[];

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.navItems = [
      { label: 'Notes', routerLink: 'notes', icon: 'pi pi-pencil' },
      { label: 'Tâches', routerLink: 'tasks', icon: 'pi pi-check-circle' },
      { label: 'Films & séries', routerLink: 'to-watch', icon: 'pi pi-desktop' },
      { label: 'Administration', routerLink: 'administration', icon: 'pi pi-briefcase' }
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
