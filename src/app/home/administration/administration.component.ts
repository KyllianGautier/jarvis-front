import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../shared/services/authentication/authentication.service';
import {MessageService} from 'primeng/api';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.scss']
})
export class AdministrationComponent implements OnInit {

  public maxRowPerPage = 20;

  public signUpRequests: SignUpRequest[];

  constructor(
    private authenticationService: AuthenticationService,
    private messageService: MessageService,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.authenticationService.getSignUpRequests()
      .subscribe(
        signUpRequests => this.signUpRequests = signUpRequests,
        error => console.error(error)
      );
  }

  public acceptSignUpRequest(idSignUpRequest: number): void {
    this.authenticationService.acceptSignUpRequest(idSignUpRequest)
      .subscribe(
        signUpRequests => {
          this.signUpRequests = signUpRequests;
          this.messageService.add({
            severity: 'success',
            summary: this.translate.instant('home.administration.signUpRequests.acceptMessage')
          });
        },
        error => console.error(error)
      );
  }

  public rejectSignUpRequest(idSignUpRequest: number): void {
    this.authenticationService.rejectSignUpRequest(idSignUpRequest)
      .subscribe(
        signUpRequests => {
          this.signUpRequests = signUpRequests;
          this.messageService.add({
            severity: 'success',
            summary: this.translate.instant('home.administration.signUpRequests.rejectMessage')
          });
        },
        error => console.error(error)
      );
  }

}
