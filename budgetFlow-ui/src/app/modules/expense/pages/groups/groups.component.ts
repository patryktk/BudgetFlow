import {Component, OnInit} from '@angular/core';
import {GroupService} from "../../../../services/services/group.service";
import {GroupRequest} from "../../../../services/models/group-request";

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrl: './groups.component.scss'
})
export class GroupsComponent implements OnInit {
  inGroup = false;
  groupRequest: GroupRequest = {name: '', description: ''};

  constructor(
    private groupService: GroupService,
  ) {
  }


  ngOnInit(): void {
    this.checkGroupStatus();
  }



  createGroup(){
    this.groupService.createGroup({
      body: this.groupRequest
    }).subscribe({
      next: result => {
        console.log("Group created successfully:" , result);
      }
    })
  }

  private checkGroupStatus() {
    // this.groupService.
  }
}
