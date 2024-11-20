import {Component, EventEmitter, Input, Output} from '@angular/core';
import {GroupService} from "../../../../services/services/group.service";
import {GroupInviteRequest} from "../../../../services/models/group-invite-request";

@Component({
  selector: 'app-invite-to-group',
  templateUrl: './invite-to-group.component.html',
  styleUrl: './invite-to-group.component.scss'
})
export class InviteToGroupComponent {

  invRequest: GroupInviteRequest = {};
  email = '';


  constructor(
    private groupService: GroupService
  ) {
  }
  @Input() groupId!: number | undefined;
  @Output() close = new EventEmitter<void>(); // EventEmitter do zamykania popupu
  closePopup() {
    this.close.emit(); // Wysyła zdarzenie do rodzica, aby zamknąć popup
  }

  sendInvitation() {
    if (this.email) {
      this.invRequest.userEmail = this.email;
      this.groupService.inviteToGroup({
        body: this.invRequest
      }).subscribe({
        next: result => {
          console.log(`Invitation sent to ${this.email}`);
        }
      })
      alert('Invitation sent successfully!');
      this.closePopup(); // Zamyka popup po wysłaniu zaproszenia
    } else {
      alert('Please enter a valid email.');
    }
  }
}
