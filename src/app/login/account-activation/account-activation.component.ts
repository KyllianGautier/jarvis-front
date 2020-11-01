import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../shared/services/authentication/authentication.service';
import { mergeMap } from 'rxjs/operators';
import { appPaths } from '../../shared/constants/app-paths';
import { MessageService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { appConstants } from '../../shared/constants/app-constants';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-account-activation',
  templateUrl: './account-activation.component.html',
  styleUrls: ['./account-activation.component.scss']
})
export class AccountActivationComponent implements OnInit {

  public appName: string;

  public tokenVerified: boolean | undefined;

  public accountActivationForm: FormGroup;
  public newAccountActivationTokenForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private deviceService: DeviceDetectorService,
    private messageService: MessageService,
    private translate: TranslateService
  ) {
    this.appName = appConstants.APP_NAME;
    this.tokenVerified = undefined;
  }

  ngOnInit(): void {
    this.accountActivationForm = this.formBuilder.group({
      email: [null, [ Validators.required ]],
      token: [null, [ Validators.required ]],
      password: [null, [ Validators.required ]],
      passwordConfirmation: [null, [ Validators.required ]],
      deviceType: [this.deviceService.os, [ Validators.required ]],
      browser: [this.deviceService.browser, [ Validators.required ]]
    }, { validators: this.checkPasswords });

    this.newAccountActivationTokenForm = this.formBuilder.group({
      email: [null, [ Validators.required, Validators.email ]]
    });

    this.route.queryParams
      .pipe(mergeMap(params => {
        this.accountActivationForm.get('token').setValue(params.token);
        this.accountActivationForm.get('email').setValue(params.email);
        this.newAccountActivationTokenForm.get('email').setValue(params.email);
        return this.authenticationService.checkTokenValidity(params.email, params.token);
      }))
      .subscribe(
        tokenValidity => this.tokenVerified = tokenValidity,
        err => this.tokenVerified = false
      );
  }

  public checkPasswords(group: FormGroup) {
    const pass = group.get('password').value;
    const confirmPass = group.get('passwordConfirmation').value;

    return pass === confirmPass ? null : { notSame: true };
  }

  public activateAccount(): void {
    if (this.accountActivationForm.valid) {
      this.authenticationService.activateAccount(this.accountActivationForm.value)
        .subscribe(
          () => {
            this.messageService.add({
              severity: 'success',
              summary: this.translate.instant('login.accountActivation.accountActivationForm.successMessage.summary'),
              detail: this.translate.instant('login.accountActivation.accountActivationForm.successMessage.detail')
            });
            this.router.navigate([appPaths.LOGIN]);
          },
          error => this.messageService.add({
            severity: 'error',
            summary: this.translate.instant('login.accountActivation.accountActivationForm.errorMessage.summary'),
            detail: this.translate.instant('login.accountActivation.accountActivationForm.errorMessage.detail')
          })
        );
    }
  }

  public backToLogin(): void {
    this.router.navigate([appPaths.LOGIN]);
  }

  public sendNewToken(): void {
    if (this.newAccountActivationTokenForm.valid) {
      this.authenticationService.getNewAccountActivationToken(this.newAccountActivationTokenForm.value.email)
        .subscribe(() => {
            this.messageService.add({
              severity: 'success',
              summary: this.translate.instant('login.accountActivation.tokenNotValid.buttonNewToken.success.summary'),
              detail: this.translate.instant('login.accountActivation.tokenNotValid.buttonNewToken.success.detail')
            });
            this.backToLogin();
          },
          err => {
            this.messageService.add({
              severity: 'error',
              summary: this.translate.instant('login.accountActivation.tokenNotValid.buttonNewToken.error.summary'),
              detail: this.translate.instant('login.accountActivation.tokenNotValid.buttonNewToken.error.detail')
            });
            this.backToLogin();
          });
    }
  }
}
