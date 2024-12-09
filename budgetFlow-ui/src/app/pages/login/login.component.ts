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
        this.tokenService.token = result.token as string;
        const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/expense';
        this.router.navigateByUrl(returnUrl);
      },
      error: err => {
        console.log(err);
        if (err.error.validationErrors) {
          this.errorMsg = err.error.validationErrors;
        } else {
          this.errorMsg.push(err.error.businessErrorMessage || "Error. Try again later!");
        }
      }
    })
  }

  register() {
    this.router.navigate(['register']);
  }
}
