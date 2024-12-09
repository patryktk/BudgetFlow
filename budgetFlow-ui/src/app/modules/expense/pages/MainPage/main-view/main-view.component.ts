import {Component, OnInit} from '@angular/core';
import {ExpenseService} from "../../../../../services/services/expense.service";
import {ExpenseResponseForStatistics} from "../../../../../services/models/expense-response-for-statistics";
import {StatisticsByMonthRequest} from "../../../../../services/models/statistics-by-month-request";
import {UtilsService} from "../../../../../services/utils/utils.service";

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrl: './main-view.component.scss'
})
export class MainViewComponent implements OnInit{

  statistics: ExpenseResponseForStatistics[] = []
  requestStatistics: StatisticsByMonthRequest = {startDate: '', endDate: ''}


  constructor(private expenseService: ExpenseService,
              private utilsService: UtilsService) {
  }


  ngOnInit(): void {
    this.loadStatistics();
  }


  private loadStatistics() {
    this.requestStatistics = this.utilsService.prepareRequestDatesActiveMonth();

    this.expenseService.getStatisticsByMonth({
      body: this.requestStatistics
    }).subscribe({
      next: result => {
        this.statistics = result;
      },
      error: err => {
        console.log("Error during getting statistics data")
      }
    })
  }
}
