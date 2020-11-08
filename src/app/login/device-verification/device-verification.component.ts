import { Component, OnInit } from '@angular/core';
import { mergeMap } from 'rxjs/operators';
import { appPaths } from '../../shared/constants/app-paths';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../shared/services/authentication/authentication.service';
import { throwError } from 'rxjs';
import { MessageService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-device-verification',
  templateUrl: './device-verification.component.html',
  styleUrls: ['./device-verification.component.scss']
})
export class DeviceVerificationComponent implements OnInit {

  private email: string;
  private token: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private translate: TranslateService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.route.queryParams
      .pipe(mergeMap(params => {
        this.email = params.email;
        this.token = params.token;
        return this.authenticationService.checkDeviceVerificationTokenValidity(this.email, this.token);
      }))
      .pipe(mergeMap(deviceVerificationTokenValidity => {
        if (deviceVerificationTokenValidity) {
          return this.authenticationService.verifyDevice(this.email, this.token);
        } else {
          throwError('token expired or not valid');
        }
      }))
      .subscribe(
        tokenValidity => {
          this.messageService.add({
            severity: 'success',
            summary: this.translate.instant('login.deviceVerification.successMessage.summary'),
            detail: this.translate.instant('login.deviceVerification.successMessage.detail')
          });
          this.router.navigate([appPaths.LOGIN]);
        },
        err => {
          console.error(err);
          this.messageService.add({
            severity: 'error',
            summary: this.translate.instant('login.deviceVerification.errorMessage.summary'),
            detail: this.translate.instant('login.deviceVerification.errorMessage.detail')
          });
          this.router.navigate([appPaths.LOGIN]);
        }
      );
  }

}
