import {Component} from '@angular/core';
import {AuthenticationService} from "../../services/services/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-account-activation',
  templateUrl: './account-activation.component.html',
  styleUrl: './account-activation.component.scss'
})
export class AccountActivationComponent {

  message = '';
  isOkay = true;
  submitted = false;

  constructor(
    private router: Router,
    private authService: AuthenticationService,
  ) {
  }

  redirectToLogin() {
    this.router.navigate(['login']);
  }

  onCodeCompleted(token: string) {
    this.confirmAccount(token);
  }

  private confirmAccount(token: string) {
    this.authService.confirm({
      token: token,
    }).subscribe({
      next: (() => {
        this.message = 'Your account has been activated. \n Now you can login'
        this.submitted = true;
        this.isOkay = true;
      }),
      error: error => {
        this.message = 'Token has expired or invalid'
        this.submitted = true;
        this.isOkay = false;
      }
    })
  }
}
