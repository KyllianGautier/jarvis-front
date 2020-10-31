import { NgModule } from '@angular/core';
import { paths } from './shared/constants/app-paths';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { AccountActivationComponent } from './login/account-activation/account-activation.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NotesComponent } from './home/notes/notes.component';
import { TasksComponent } from './home/tasks/tasks.component';
import { ToWatchComponent } from './home/to-watch/to-watch.component';
import { AdministrationComponent } from './home/administration/administration.component';
import { ProfileComponent } from './home/profile/profile.component';
import { UserConnectionGuard } from './shared/guards/UserConnectionGuard';
import { AdministratorGuard } from './shared/guards/AdministratorGuard';


const routes: Routes = [
  {
    path: paths.LOGIN,
    children: [
      { path: '', component: LoginComponent },
      { path: paths.ACCOUNT_ACTIVATION, component: AccountActivationComponent },
      { path: '**', component: NotFoundComponent }
    ]
  },
  {
    path: paths.HOME,
    component: HomeComponent,
    canActivate: [ UserConnectionGuard ],
    canActivateChild: [ UserConnectionGuard ],
    children: [
      { path: paths.NOTES, component: NotesComponent },
      { path: paths.TASKS, component: TasksComponent },
      { path: paths.TO_WATCH, component: ToWatchComponent },
      { path: paths.ADMINISTRATION, component: AdministrationComponent,
        canActivate: [ AdministratorGuard ],
        canActivateChild: [ AdministratorGuard ]
      },
      { path: paths.PROFILE, component: ProfileComponent },
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
