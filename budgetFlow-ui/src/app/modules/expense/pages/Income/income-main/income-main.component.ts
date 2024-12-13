import {Component, OnInit} from '@angular/core';
import {GroupService} from "../../../../../services/services/group.service";
import {GroupResponseWithUser} from "../../../../../services/models/group-response-with-user";

@Component({
  selector: 'app-income-main',
  templateUrl: './income-main.component.html',
  styleUrl: './income-main.component.scss'
})
export class IncomeMainComponent implements OnInit {
  selectedTab: 'all' | 'user' | 'group' = 'all';
  inGroup = false;
  groupResponse: GroupResponseWithUser = {name: '', description: ''};

  constructor(private groupSerivce: GroupService) {
  }

  ngOnInit(): void {
    this.checkGroup();
  }

  selectTab(tab: 'all' | 'user' | 'group') {
    this.selectedTab = tab;
  }

  private checkGroup() {
    this.groupSerivce.getGroup().subscribe({
      next: (res) => {
        if(res){
          this.groupResponse = res;
          this.inGroup = true;
        }
      },
      error: (err) => {
        console.log("Błąd podczas pobierania danych grupy", err);
      }
    });
  }
}
