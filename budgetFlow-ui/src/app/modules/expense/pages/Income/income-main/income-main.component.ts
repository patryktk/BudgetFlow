import { Component } from '@angular/core';

@Component({
  selector: 'app-income-main',
  templateUrl: './income-main.component.html',
  styleUrl: './income-main.component.scss'
})
export class IncomeMainComponent {
  selectedTab: 'all' | 'user' = 'all';

  selectTab(tab: 'all' | 'user') {
    this.selectedTab = tab;
  }
}
