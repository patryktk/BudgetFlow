import { Component } from '@angular/core';

@Component({
  selector: 'app-expense-main',
  templateUrl: './expense-main.component.html',
  styleUrl: './expense-main.component.scss'
})
export class ExpenseMainComponent {
  selectedTab: 'all' | 'user' = 'all';

  selectTab(tab: 'all' | 'user') {
    this.selectedTab = tab;
  }
}
