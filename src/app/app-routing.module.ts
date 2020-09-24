import { NgModule } from '@angular/core';
import { paths } from './shared/constants/app-paths';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { UserConnectionGuard } from './shared/guards/UserConnectionGuard';


const routes: Routes = [
  { path: '', redirectTo: paths.home, pathMatch: 'full' },
  {
    path: paths.home,
    component: HomeComponent,
    canActivate: [ UserConnectionGuard ],
    canActivateChild: [ UserConnectionGuard ]
  },
  { path: paths.login, component: LoginComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
