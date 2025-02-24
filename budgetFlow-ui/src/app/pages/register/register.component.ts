import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../../services/services/authentication.service";
import {RegistrationRequest} from "../../services/models/registration-request";

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrl: './register.component.scss',
    standalone: false
})
export class RegisterComponent {

  constructor(
    private router: Router,
    private authService: AuthenticationService) {
  }

  errorMsg: Array<string> = [];
  registrationRequest: RegistrationRequest = {firstname: "", lastname: "", email: '', password: ''};

  register() {
    this.errorMsg = [];
    this.authService.register({
      body: this.registrationRequest
    }).subscribe({
      next: () => {
        this.router.navigate(['login'], {state: {successMessage: 'Rejestracja udana. Sprawdź e-mail, aby potwierdzić konto.'}});
      },
      error: err => {
        if (err.error !== null && err.error.validationErrors) {
          this.errorMsg = err.error.validationErrors;
        } else if(err.error !== null) {
          this.errorMsg.push(err.error.businessErrorDescription || "Error. Try again later!");
        }else{
          this.errorMsg.push("Error. Try again later!");
        }
      }
    })
  }

  login() {
    this.router.navigate(['login']);
  }
}
