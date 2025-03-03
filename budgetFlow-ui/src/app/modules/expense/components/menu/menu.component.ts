import {Component, OnInit, ViewChild} from '@angular/core';
import {JwtHelperService} from "@auth0/angular-jwt";
import {TokenService} from "../../../../services/token/token.service";
import { MatMenuTrigger } from '@angular/material/menu';


@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrl: './menu.component.scss',
    standalone: false
})
export class MenuComponent implements OnInit{

  username: String = '';

  @ViewChild(MatMenuTrigger, { static: false }) trigger: MatMenuTrigger | null = null;

  constructor(
    private tokenService: TokenService,) {
  }


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
