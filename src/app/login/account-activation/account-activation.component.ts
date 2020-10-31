import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { AuthenticationService } from '../../shared/services/authentication/authentication.service';
import { mergeMap } from 'rxjs/operators';
import {paths} from '../../shared/constants/app-paths';
import {MessageService} from 'primeng/api';
import {TranslateService} from '@ngx-translate/core';
import { forkJoin } from 'rxjs';
import {ClientService} from '../../shared/services/client/client.service';

@Component({
  selector: 'app-account-activation',
  templateUrl: './account-activation.component.html',
  styleUrls: ['./account-activation.component.scss']
})
export class AccountActivationComponent implements OnInit {

  public tokenVerified: boolean | undefined;

  public activationToken: string;
  public accountActivationForm: FormGroup;
  public newAccountActivationTokenForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private clientService: ClientService,
    private messageService: MessageService,
    private translate: TranslateService
  ) {
    this.tokenVerified = undefined;
  }

  ngOnInit(): void {
    this.accountActivationForm = this.formBuilder.group({
      email: [null, [ Validators.required ]],
      token: [null, [ Validators.required ]],
      password: ['', [ Validators.required ]],
      passwordConfirmation: ['', [ Validators.required ]],
      publicIp: [null, [ Validators.required ]],
      deviceType: ['devicetype', [ Validators.required ]]
    }, { validators: this.checkPasswords });

    this.newAccountActivationTokenForm = this.formBuilder.group({
      email: [null, [ Validators.required, Validators.email ]]
    });

    this.route.queryParams
      .pipe(mergeMap(params => {
        this.accountActivationForm.get('token').setValue(params.token);
        this.accountActivationForm.get('email').setValue(params.email);
        this.newAccountActivationTokenForm.get('email').setValue(params.email);
        return forkJoin({
          publicIp: this.clientService.getPublicIp(),
          isTokenVerified: this.authenticationService.checkTokenValidity(params.email, params.token)
        });
      }))
      .subscribe(
        results => {
          console.log(results);
          this.accountActivationForm.get('publicIp').setValue(results.publicIp.ip);
          this.tokenVerified = results.isTokenVerified;
        },
        err => {
          console.error(err);
          this.tokenVerified = false;
        }
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
            this.router.navigate([paths.LOGIN]);
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
    this.router.navigate([paths.LOGIN]);
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
