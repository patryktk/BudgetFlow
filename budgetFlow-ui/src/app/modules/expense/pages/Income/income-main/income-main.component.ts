import {Component, OnInit} from '@angular/core';
import {GroupService} from "../../../../../services/services/group.service";

@Component({
    selector: 'app-income-main',
    templateUrl: './income-main.component.html',
    styleUrl: './income-main.component.scss',
    standalone: false
})
export class IncomeMainComponent implements OnInit {
  selectedTab: 'all' | 'user' | 'group' = 'all';
  inGroup = false;

  constructor(private groupService: GroupService) {
  }

  ngOnInit(): void {
    this.checkGroup();
  }

  selectTab(tab: 'all' | 'user' | 'group') {
    this.selectedTab = tab;
  }

  private checkGroup() {
    this.groupService.getGroup().subscribe({
      next: (res) => {
        if(res){
          this.inGroup = true;
        }
      },
      error: (err) => {
        console.log("Błąd podczas pobierania danych grupy", err);
      }
    });
  }
}
