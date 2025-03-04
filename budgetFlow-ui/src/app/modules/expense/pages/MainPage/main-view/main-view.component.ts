import {Component, OnInit} from '@angular/core';
import {ExpenseService} from "../../../../../services/services/expense.service";
import {StatisticsByMonthRequest} from "../../../../../services/models/statistics-by-month-request";
import {UtilsService} from "../../../../../services/utils/utils.service";
import {IncomeService} from "../../../../../services/services/income.service";
import {ResponseForStatistics} from "../../../../../services/models/response-for-statistics";
import {TokenService} from "../../../../../services/token/token.service";
import {JwtHelperService} from "@auth0/angular-jwt";

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrl: './main-view.component.scss',
  standalone: false
})
export class MainViewComponent implements OnInit {

  expensesStatistics: ResponseForStatistics[] = []
  requestStatistics: StatisticsByMonthRequest = {startDate: '', endDate: ''}
  incomeStatistics: ResponseForStatistics[] = []
  username: string | null = "";



  constructor(private expenseService: ExpenseService,
              private utilsService: UtilsService,
              private incomeService: IncomeService,
              private tokenService: TokenService) {
  }

  ngOnInit(): void {
    this.loadStatistics();
    this.loadUsername();
    this.loadChart();
  }

  private loadStatistics() {
    this.requestStatistics = this.utilsService.prepareRequestDatesActiveMonth();

    this.expenseService.getStatisticsByMonth({
      body: this.requestStatistics
    }).subscribe({
      next: result => {
        this.expensesStatistics = result;
      },
      error: err => {
        console.log("Error during getting statistics data", err)
      }
    })

    this.incomeService.getStatisticsByMonth1({
      body: this.requestStatistics
    }).subscribe({
      next: result => {
        this.incomeStatistics = result;
      },
      error: err => {
        console.log("Error during getting statistics data", err)
      }
    })
  }

  private loadUsername() {
    const jwtHelper = new JwtHelperService();
    this.username = jwtHelper.decodeToken(this.tokenService.token).fullName;
  }

  private loadChart() {

  }



}
