import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public navItems: MenuItem[];

  public userMenuItems: MenuItem[];

  constructor() {}

  ngOnInit() {
    this.navItems = [
      { label: 'Notes', routerLink: 'notes', icon: 'pi pi-pencil' },
      { label: 'Tâches', routerLink: 'tasks', icon: 'pi pi-check-circle' },
      { label: 'Films & séries', routerLink: 'to-watch', icon: 'pi pi-desktop' },
      { label: 'Administration', routerLink: 'administration', icon: 'pi pi-briefcase' }
    ];

    this.userMenuItems = [
      { label: 'Paramètres', routerLink: '', icon: 'pi pi-cog' },
      { label: 'Déconnexion', routerLink: '', icon: 'pi pi-sign-out' },
    ];
  }
}
