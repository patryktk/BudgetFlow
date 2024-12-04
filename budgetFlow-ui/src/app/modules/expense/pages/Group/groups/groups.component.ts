import {Component, OnInit} from '@angular/core';
import {GroupService} from "../../../../../services/services/group.service";
import {GroupRequest} from "../../../../../services/models/group-request";
import {GroupResponseWithUser} from "../../../../../services/models/group-response-with-user";
import {JwtHelperService} from "@auth0/angular-jwt";
import {TokenService} from "../../../../../services/token/token.service";

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrl: './groups.component.scss'
})
export class GroupsComponent implements OnInit {
  inGroup = false;
  groupRequest: GroupRequest = {name: '', description: ''};
  groupDetails: GroupResponseWithUser = {};
  groupOwner = false;

  showInvitePopup = false;

  constructor(
    private groupService: GroupService,
    private tokenService: TokenService,
  ) {
  }


  ngOnInit(): void {
    this.checkGroupStatus();
    //TODO: Sprawdzenie czy jesteś właścielem grupy
    // this.checkIfGroupOwner();
  }


  deleteGroup() {
    if (this.groupDetails?.id === undefined) {
      return;
    }
    this.groupService.deleteGroup({
      groupId: this.groupDetails.id
    }).subscribe({
      next: result => {
        console.log(result);
        this.inGroup = false;
      }
    });
  }


  createGroup() {
    this.groupService.createGroup({
      body: this.groupRequest
    }).subscribe({
      next: result => {
        console.log("Group created successfully:", result);
        this.checkGroupStatus();
      },
      error: err => {
        console.log(err);
      }
    })
  }

  private checkGroupStatus() {
    this.groupService.getGroup().subscribe({
      next: value => {
        if (value) {
          this.inGroup = true;
          this.groupDetails = value;
          console.log(value)
          this.checkIfGroupOwner();
        }
      },
      error: err => {
        console.log(err);
      }
    });
  }

  openInvitePopup() {
    this.showInvitePopup = true;
  }

  closeInvitePopup() {
    this.showInvitePopup = false;
  }

  private checkIfGroupOwner() {
    const jwtHelper = new JwtHelperService();
    // Sprawdzenie czy zalogowany użytkownik jest właścicielem grupy
    if (this.groupDetails.createdByUser?.email === jwtHelper.decodeToken(this.tokenService.token).sub) {
      this.groupOwner = true;
    }

  }
}
