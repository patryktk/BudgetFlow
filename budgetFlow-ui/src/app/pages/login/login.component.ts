import { Component } from '@angular/core';
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
      error: error => {
        console.log(error);
      }
    })
  }

  register(){
    this.router.navigate(['register']);
  }
}
