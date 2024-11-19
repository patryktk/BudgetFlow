import {Component, OnInit} from '@angular/core';
import {GroupService} from "../../../../services/services/group.service";
import {GroupRequest} from "../../../../services/models/group-request";
import {GroupResponse} from "../../../../services/models/group-response";

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrl: './groups.component.scss'
})
export class GroupsComponent implements OnInit {
  inGroup = false;
  groupRequest: GroupRequest = {name: '', description: ''};
  groupDetails: GroupResponse = {};

  showInvitePopup = false;

  constructor(
    private groupService: GroupService,
  ) {
  }


  ngOnInit(): void {
    this.checkGroupStatus();
  }


  createGroup() {
    this.groupService.createGroup({
      body: this.groupRequest
    }).subscribe({
      next: result => {
        console.log("Group created successfully:", result);
      }
    })
  }

  private checkGroupStatus() {
    this.groupService.getGroup().subscribe({
      next: value => {
        if (value) {
          this.inGroup = true;
          this.groupDetails = value;
        }
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
