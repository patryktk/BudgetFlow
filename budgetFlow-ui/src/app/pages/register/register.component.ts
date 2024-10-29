import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../../services/services/authentication.service";
import {RegistrationRequest} from "../../services/models/registration-request";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
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
      next: result => {
        this.router.navigate(['login'])
      },
      error: error => {
        console.log(error);
        // this.errorMsg.push(error.message)
      }
    })
  }

  login() {
    this.router.navigate(['login']);
  }


}
