import {Component, OnInit} from '@angular/core';
import {TokenService} from "../../services/token/token.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../../services/services/authentication.service";
import {AuthenticationRequest} from "../../services/models/authentication-request";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  constructor(
    private tokenService: TokenService,
    private router: Router,
    private authService: AuthenticationService,
    private route: ActivatedRoute,) {
  }

  authRequest: AuthenticationRequest = {email: '', password: ''}
  errorMsg: Array<string> = [];
  successMsg = '';
  token = "";

  ngOnInit(): void {
    if (typeof window !== 'undefined' && window.history) {
      this.successMsg = history.state.successMessage;
    }
  }

  login() {
    this.errorMsg = [];
    this.authService.authentication({
      body: this.authRequest
    }).subscribe({
      next: result => {
        this.token = result.token as string;
        this.tokenService.token = this.token;
        this.getUserId();
        const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/expense';
        this.router.navigateByUrl(returnUrl);
      },
      error: err => {
        if (err.error !== null && err.error.validationErrors) {
          this.errorMsg = err.error.validationErrors;
        } else if(err.error !== null) {
          this.errorMsg.push(err.error.businessErrorMessage);
        }else{
          this.errorMsg.push("Error. Try again later!");
        }
      }
    })
  }

  getUserId(){
    const params = {
      Authorization: this.token  // Wstaw odpowiedni token
    };

    this.authService.validateToken(params).subscribe({
      next: result => {
          sessionStorage.setItem('userId', <string>result);
      },
      error: err => {
        console.log("Error while getting user id", err)
      }
    })
  }

  register() {
    this.router.navigate(['register']);
  }
}
