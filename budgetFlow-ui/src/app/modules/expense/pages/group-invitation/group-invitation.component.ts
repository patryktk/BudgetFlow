import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {GroupService} from "../../../../services/services/group.service";
import {AuthenticationService} from "../../../../services/services/authentication.service";

@Component({
  selector: 'app-group-invitation',
  templateUrl: './group-invitation.component.html',
  styleUrl: './group-invitation.component.scss'
})
export class GroupInvitationComponent implements OnInit {
  token: string | null = null;
  invitation: any;
  loading = true;
  error: string | null = null;


  constructor(
    private route: ActivatedRoute,
    private authService: AuthenticationService,
    private groupService: GroupService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get("token");
    if(!this.isLoggedIn()){
      this.redirectToLogin();
    }else if (this.token){
      this.groupService.verifyInvitation({token: this.token}).subscribe({
        next: result => {
          this.invitation = result;
          this.loading = false;
        },
        error: err => {
          this.error = "Zaproszenie jest nieprawidłowe lub wygasło";
          this.loading = false;
        }
      });
    }
  }

  redirectToLogin(): void {
    const currentUrl = window.location.pathname; // Aktualna ścieżka
    this.router.navigate(['/login'], { queryParams: { returnUrl: currentUrl } });
  }

  isLoggedIn() : boolean{
    const token = localStorage.getItem('token');
    return !!token;
  }

  acceptInvitation(){
    if(this.token){
      this.groupService.acceptInvitation({token: this.token}).subscribe({
        next: () => this.router.navigate(['/expense']),
        error: () => (this.error = "Wystąpił błąd przy akceptowaniu zaproszenia")
      });
    }
  }

  declineInvitation(){
    this.router.navigate(['/expense'])
  }


}
