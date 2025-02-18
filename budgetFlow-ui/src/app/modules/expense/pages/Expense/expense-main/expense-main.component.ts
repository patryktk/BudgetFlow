import {Component, OnInit} from '@angular/core';
import {GroupService} from "../../../../../services/services/group.service";

@Component({
    selector: 'app-expense-main',
    templateUrl: './expense-main.component.html',
    styleUrl: './expense-main.component.scss',
    standalone: false
})
export class ExpenseMainComponent implements OnInit {
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
        if (res) {
          this.inGroup = true;
        }
      },
      error: (err) => {
        console.log("Błąd podczas pobierania danych grupy", err);
      }
    });
  }
}
