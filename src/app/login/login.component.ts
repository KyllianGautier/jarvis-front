import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthenticationService } from '../shared/services/authentication/authentication.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { appPaths } from '../shared/constants/app-paths';
import { appConstants } from '../shared/constants/app-constants';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public appName: string;

  public deviceValidation: boolean;

  public signInForm: FormGroup;
  public signUpForm: FormGroup;
  public deviceValidationForm: FormGroup;

  public deviceInfos;

  constructor(
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private router: Router,
    private translate: TranslateService,
    private deviceService: DeviceDetectorService
  ) {
    this.appName = appConstants.APP_NAME;
    this.deviceValidation = false;

    this.signInForm = formBuilder.group({
      email: ['', [ Validators.email, Validators.required ]],
      password: ['', [ Validators.required ]]
    });

    this.signUpForm = formBuilder.group({
      firstName: ['', [ Validators.required ]],
      lastName: ['', [ Validators.required ]],
      email: ['', [ Validators.email, Validators.required ], this.emailAsyncValidator(this.authenticationService)]
    });

    this.deviceValidationForm = this.formBuilder.group({
      deviceType: [null, [ Validators.required ]],
      browser: [null, [ Validators.required ]],
      secretCode: [null, [ Validators.required ]]
    });
  }

  ngOnInit(): void { }

  public emailAsyncValidator = (authenticationService: AuthenticationService) => {
    return (control) => {
      return authenticationService.checkEmailValidity(control.value)
        .pipe(
          map((isAvailable) => {
            return isAvailable ? null : { emailExists: true };
          })
        );
    };
  }

  public signIn(): void {
    if (this.signInForm.valid) {
      this.authenticationService.signIn(this.signInForm.value)
        .subscribe(
          auth => {
            this.router.navigate([appPaths.HOME]);
          },
          err => {
            if (err.status === 403) {
              this.deviceValidation = true;
              this.deviceValidationForm.get('deviceType').setValue(this.deviceService.os);
              this.deviceValidationForm.get('browser').setValue(this.deviceService.browser);
            } else {
              this.messageService.add({
                severity: 'error',
                summary: this.translate.instant('login.connection.signInForm.errorMessage.summary'),
                detail: this.translate.instant('login.connection.signInForm.errorMessage.detail')
              });
            }
          }
        );
    }
  }

  public signUp(): void {
    if (this.signUpForm.valid) {
      this.authenticationService.signUp(this.signUpForm.value)
        .subscribe(
          () => {
            this.messageService.add({
              severity: 'success',
              summary: this.translate.instant('login.connection.signUpForm.successMessage.summary'),
              detail: this.translate.instant('login.connection.signUpForm.successMessage.detail')
            });
            this.signUpForm.reset();
          },
            error => console.error(error));
    }
  }

  public validateDevice(): void {

  }
}
