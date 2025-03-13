import {Component, OnInit} from '@angular/core';
import {ExpenseService} from "../../../../../services/services/expense.service";
import {StatisticsByMonthRequest} from "../../../../../services/models/statistics-by-month-request";
import {UtilsService} from "../../../../../services/utils/utils.service";
import {IncomeService} from "../../../../../services/services/income.service";
import {ResponseForStatistics} from "../../../../../services/models/response-for-statistics";
import {TokenService} from "../../../../../services/token/token.service";
import {JwtHelperService} from "@auth0/angular-jwt";
import {Chart, ChartConfiguration, ChartType, registerables} from "chart.js";
import {SumResponse} from "../../../../../services/models/sum-response";

Chart.register(...registerables);

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

  doughnutChartType: ChartType = 'doughnut';

  doughnutChartData: ChartConfiguration['data'] = {
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: []
    }]
  };

  doughnutChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          boxWidth: 20,
          padding: 10
        }
      }
    }
  };
  isDataLoaded: boolean = false;
  sumOfExpense: SumResponse = {sum: undefined};
  sumOfIncome: SumResponse = {sum: undefined};

  constructor(private expenseService: ExpenseService,
              private utilsService: UtilsService,
              private incomeService: IncomeService,
              private tokenService: TokenService) {
  }

  ngOnInit(): void {
    this.loadStatistics();
    this.loadUsername();
  }

  private loadStatistics() {
    this.requestStatistics = this.utilsService.prepareRequestDatesActiveMonth();

    this.expenseService.getSumOfExpensesByMonth({
      body: this.requestStatistics
    }).subscribe({
      next: result => {
        this.sumOfExpense = result ?? {sum: undefined};
      },
      error: err => {
        console.log("Error loading fetchStatistics", err);
        this.sumOfExpense = {sum: undefined}; // Obsługa błędu
      }
    });

    this.incomeService.getSumOfIncomesByMonth({
      body: this.requestStatistics
    }).subscribe({
      next: result => {
        this.sumOfIncome = result ?? {sum: undefined};
      },
      error: err => {
        console.log("Error loading fetchStatistics", err);
        this.sumOfExpense = {sum: undefined};
      }
    })

    this.expenseService.getStatisticsByMonth({
      body: this.requestStatistics
    }).subscribe({
      next: result => {
        this.expensesStatistics = result;
        if (result.length > 0) {
          this.loadChartData()
        } else {
          this.isDataLoaded = true;
        }
      },
      error: err => {
        console.log("Error during getting statistics data", err)
        this.isDataLoaded = false;
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

  private getRandomColor(): string {
    return `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`;
  }

  private loadChartData() {
    const validStatistics = this.expensesStatistics.filter(
      item => item.name && item.amount && item.amount > 0
    );

    this.doughnutChartData = {
      labels: validStatistics.map(item => item.name || 'Nieznana kategoria'),
      datasets: [{
        data: validStatistics.map(item => item.amount || 0),
        backgroundColor: validStatistics.map(() => this.getRandomColor()),
      }]
    };
    this.isDataLoaded = true;
  }
}
