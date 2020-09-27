import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { UserConnectionGuard } from './shared/guards/UserConnectionGuard';
import { InputTextModule } from 'primeng/inputtext';
import { TabViewModule } from 'primeng/tabview';
import { PanelModule } from 'primeng/panel';
import {ButtonModule} from 'primeng/button';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {ToastModule} from 'primeng/toast';
import {HttpClientModule} from '@angular/common/http';
import {MessageService} from 'primeng/api';
import {MenuModule} from 'primeng/menu';
import {RippleModule} from 'primeng/ripple';
import { NotesComponent } from './home/notes/notes.component';
import { TasksComponent } from './home/tasks/tasks.component';
import { ToWatchComponent } from './home/to-watch/to-watch.component';
import { AdministrationComponent } from './home/administration/administration.component';
import { ProfileComponent } from './home/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NotFoundComponent,
    NotesComponent,
    TasksComponent,
    ToWatchComponent,
    AdministrationComponent,
    ProfileComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    InputTextModule,
    TabViewModule,
    PanelModule,
    ButtonModule,
    ReactiveFormsModule,
    ToastModule,
    MenuModule,
    RippleModule
  ],
  providers: [
    UserConnectionGuard,
    FormBuilder,
    MessageService
  ],
  bootstrap: [
    AppComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule { }
