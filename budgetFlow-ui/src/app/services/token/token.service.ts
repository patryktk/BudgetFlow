import {Injectable} from '@angular/core';
import {JwtHelperService} from "@auth0/angular-jwt";


@Injectable({
  providedIn: 'root'
})
export class TokenService {

  set token(token: string) {
    localStorage.setItem('token', token);
  }

  get token() {
    return localStorage.getItem('token') as string;
  }

  isTokenNotValid() {
    return !this.isTokenValid();
  }

  private isTokenValid() {
    const token = this.token;
    if(!token){
      return false;
    }
    const jwtHelper = new JwtHelperService();
    const isTokenExpired = jwtHelper.isTokenExpired(token);
    if(isTokenExpired) {
      localStorage.removeItem('token');
      return false;
    }
    return true;
  }

  //15 min timer w przypadku braku aktywności, może na później
  // logout(){
  //   sessionStorage.clear();
  //   localStorage.removeItem('token');
  // }
  //
  // private inactivityTimer: any;
  //
  // startInactivityTimer(){
  //   this.clearInactivityTimer();
  //   this.inactivityTimer = setTimeout(() => {
  //     this.logout();
  //   }, 15 * 60 * 1000); //15 minut
  // }
  //
  // clearInactivityTimer(){
  //   if(this.inactivityTimer){
  //     clearTimeout(this.inactivityTimer);
  //   }
  // }

}
