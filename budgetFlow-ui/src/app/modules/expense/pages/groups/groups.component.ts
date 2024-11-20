import {Component, OnInit} from '@angular/core';
import {GroupService} from "../../../../services/services/group.service";
import {GroupRequest} from "../../../../services/models/group-request";
import {GroupResponseWithUser} from "../../../../services/models/group-response-with-user";

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrl: './groups.component.scss'
})
export class GroupsComponent implements OnInit {
  inGroup = false;
  groupRequest: GroupRequest = {name: '', description: ''};
  groupDetails: GroupResponseWithUser = {};

  showInvitePopup = false;

  constructor(
    private groupService: GroupService,
  ) {
  }


  ngOnInit(): void {
    this.checkGroupStatus();
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
        }
      },
      error: err => {
        console.log(err);
      }
    });
  }

  openInvitePopup() {
    this.showInvitePopup = true; // Ustawia flagę na true, aby otworzyć popup
  }

  closeInvitePopup() {
    this.showInvitePopup = false; // Ustawia flagę na false, aby zamknąć popup
  }
}
