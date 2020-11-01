import { NgModule } from '@angular/core';
import { appPaths } from './shared/constants/app-paths';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { AccountActivationComponent } from './login/account-activation/account-activation.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { NotesComponent } from './home/notes/notes.component';
import { TasksComponent } from './home/tasks/tasks.component';
import { ToWatchComponent } from './home/to-watch/to-watch.component';
import { AdministrationComponent } from './home/administration/administration.component';
import { ProfileComponent } from './home/profile/profile.component';
import { UserConnectionGuard } from './shared/guards/UserConnectionGuard';
import { AdministratorGuard } from './shared/guards/AdministratorGuard';


const routes: Routes = [
  {
    path: appPaths.LOGIN,
    children: [
      { path: '', component: LoginComponent },
      { path: appPaths.ACCOUNT_ACTIVATION, component: AccountActivationComponent },
      { path: '**', component: NotFoundComponent }
    ]
  },
  {
    path: appPaths.HOME,
    component: HomeComponent,
    canActivate: [ UserConnectionGuard ],
    canActivateChild: [ UserConnectionGuard ],
    children: [
      { path: appPaths.NOTES, component: NotesComponent },
      { path: appPaths.TASKS, component: TasksComponent },
      { path: appPaths.TO_WATCH, component: ToWatchComponent },
      { path: appPaths.ADMINISTRATION, component: AdministrationComponent,
        canActivate: [ AdministratorGuard ],
        canActivateChild: [ AdministratorGuard ]
      },
      { path: appPaths.PROFILE, component: ProfileComponent },
      { path: '**', component: NotFoundComponent }
    ]
  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
