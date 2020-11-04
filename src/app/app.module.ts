import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule } from '@angular/core';
import localeFr from '@angular/common/locales/fr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { UserConnectionGuard } from './shared/guards/UserConnectionGuard';
import { InputTextModule } from 'primeng/inputtext';
import { TabViewModule } from 'primeng/tabview';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { RippleModule } from 'primeng/ripple';
import { NotesComponent } from './home/notes/notes.component';
import { TasksComponent } from './home/tasks/tasks.component';
import { ToWatchComponent } from './home/to-watch/to-watch.component';
import { AdministrationComponent } from './home/administration/administration.component';
import { ProfileComponent } from './home/profile/profile.component';
import { TableModule} from 'primeng/table';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { registerLocaleData } from '@angular/common';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TaskFormComponent } from './shared/components/task-form/task-form.component';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { SliderModule } from 'primeng/slider';
import { SelectButtonModule } from 'primeng/selectbutton';
import { CalendarModule } from 'primeng/calendar';
import { ToolbarModule } from 'primeng/toolbar';
import { CardModule } from 'primeng/card';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ChipsModule } from 'primeng/chips';
import { TooltipModule } from 'primeng/tooltip';
import { DropdownModule } from 'primeng/dropdown';
import { LoadingComponent } from './shared/components/loading/loading.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { JarvisFontDirective } from './shared/directives/jarvis-font.directive';
import { AccountActivationComponent } from './login/account-activation/account-activation.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { UserSectionComponent } from './home/profile/user-section/user-section.component';
import { PreferencesSectionComponent } from './home/profile/preferences-section/preferences-section.component';
import { SecuritySectionComponent } from './home/profile/security-section/security-section.component';
import { DeviceSectionComponent } from './home/profile/security-section/device-section/device-section.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { TinyLabelDirective } from './shared/directives/tiny-label.directive';
import { ImportantLabelDirective } from './shared/directives/important-label.directive';

registerLocaleData(localeFr);

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

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
    ProfileComponent,
    TaskFormComponent,
    LoadingComponent,
    JarvisFontDirective,
    AccountActivationComponent,
    UserSectionComponent,
    PreferencesSectionComponent,
    SecuritySectionComponent,
    DeviceSectionComponent,
    TinyLabelDirective,
    ImportantLabelDirective
  ],
  imports: [
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader, // exported factory function needed for AoT compilation
        deps: [HttpClient]
      }
    }),
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    InputTextModule,
    TabViewModule,
    PanelModule,
    ButtonModule,
    CheckboxModule,
    ReactiveFormsModule,
    FormsModule,
    ToastModule,
    MenuModule,
    RippleModule,
    TableModule,
    ProgressSpinnerModule,
    InputTextareaModule,
    SliderModule,
    SelectButtonModule,
    CalendarModule,
    ToolbarModule,
    CardModule,
    ToggleButtonModule,
    ChipsModule,
    TooltipModule,
    DropdownModule,
    FlexLayoutModule,
    InputNumberModule,
    NgxSkeletonLoaderModule
  ],
  providers: [
    UserConnectionGuard,
    MessageService,
    {
      provide: LOCALE_ID,
      useValue: 'fr-FR'
    }
  ],
  bootstrap: [
    AppComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule { }
