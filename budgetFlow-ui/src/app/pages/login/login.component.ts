import {Component} from '@angular/core';
import {TokenService} from "../../services/token/token.service";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../services/services/authentication.service";
import {AuthenticationRequest} from "../../services/models/authentication-request";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(
    private tokenService: TokenService,
    private router: Router,
    private authService: AuthenticationService)
  {}

  authRequest: AuthenticationRequest = {email: '', password: ''}
  errorMsg: Array<string> = [];

  login(){
    this.errorMsg = [];
    this.authService.authentication({
      body: this.authRequest
    }).subscribe({
      next: result => {
        this.tokenService.token = result.token as string;
        this.router.navigate(['expense']);
      },
      error: err => {
        console.log(err);
        if (err.error.validationErrors) {
          this.errorMsg = err.error.validationErrors;
        } else {
          this.errorMsg.push(err.error.businessErrorMessage);
        }
      }
    })
  }

  register(){
    this.router.navigate(['register']);
  }
}
