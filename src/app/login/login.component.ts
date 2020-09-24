import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MessageService} from 'primeng/api';
import {AuthenticationService} from '../shared/services/authentication/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  signInForm: FormGroup;
  signUpForm: FormGroup;

  constructor(
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private router: Router
  ) {
    this.signInForm = formBuilder.group({
      email: ['', [ Validators.email, Validators.required ]],
      password: ['', [ Validators.required ]]
    });

    this.signUpForm = formBuilder.group({
      firstName: ['', [ Validators.required ]],
      lastName: ['', [ Validators.required ]],
      email: ['', [ Validators.email, Validators.required ]]
    });
  }

  ngOnInit(): void { }

  public signIn(): void {
    if (this.signInForm.valid) {
      this.authenticationService.signIn(this.signInForm.value)
        .subscribe(
          auth => {
            this.router.navigate(['/home']);
          },
          error => {
            this.messageService.add({
              severity: 'error',
              summary: 'Connexion refusée',
              detail: 'Adresse mail ou mot de passe incorrect(s).'
            })
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
              summary: 'Inscription envoyée',
              detail: 'Votre inscription sera traitée dans les plus brefs délais.'
            });
            this.signUpForm.reset();
          },
            error => console.error(error));
    }
  }
}
