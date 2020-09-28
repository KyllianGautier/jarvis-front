import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../shared/services/authentication/authentication.service';
import {MessageService} from 'primeng/api';

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
    private messageService: MessageService
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
            summary: 'Demande acceptée'
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
            summary: 'Demande refusée'
          });
        },
        error => console.error(error)
      );
  }

}
