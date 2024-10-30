import {Component, OnInit} from '@angular/core';
import {JwtHelperService} from "@auth0/angular-jwt";
import {TokenService} from "../../../../services/token/token.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit{

  constructor(
    private tokenService: TokenService,) {
  }

  username: String | null = '';

  ngOnInit(): void {
    const linkColor = document.querySelectorAll('.nav-link');

    linkColor.forEach((link) => {
      if (window.location.href.endsWith(link.getAttribute('href') || '')) {
        link.classList.add('active');
      }
      link.addEventListener('click', () => {
        linkColor.forEach((l) => {
          l.classList.remove('active');
          link.classList.remove('active');
        })
      });
    });

    const jwtHelper = new JwtHelperService();
    this.username = jwtHelper.decodeToken(this.tokenService.token).fullName;
  }


  logout() {
    localStorage.removeItem('token');
    sessionStorage.removeItem('username');
    window.location.reload();
  }
}
