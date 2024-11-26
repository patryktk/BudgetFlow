import {Component, OnInit} from '@angular/core';
import {ExpenseService} from "../../../../services/services/expense.service";
import {ExpenseResponse} from "../../../../services/models/expense-response";
import {ExpenseResponseForStatistics} from "../../../../services/models/expense-response-for-statistics";
import {StatisticsByMonthRequest} from "../../../../services/models/statistics-by-month-request";

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrl: './expense-list.component.scss'
})
export class ExpenseListComponent implements OnInit{

  expenses: ExpenseResponse[] = [];
  statistics: ExpenseResponseForStatistics[] = []
  requestStatistics: StatisticsByMonthRequest = {startDate: '', endDate: ''}


  constructor(private expenseService: ExpenseService) {
  }

  ngOnInit(): void {
    this.expenseService.getAllExpensesByUser().subscribe({
      next: result => {
        console.log(result)
        this.expenses = result;
        this.dataForTable();
      },
      error: err => {
        console.log("Error loading expenses list", err);
      }
    })
  }

  deleteExpense(id: number | undefined) {
    if (id !== undefined) {
      this.expenseService.deleteExpense({expenseId: id}).subscribe({
        next: result => {
          this.expenses = this.expenses.filter(expense => expense.id !== id);
        },
        error: err => {
          console.log("Error deleting expense");
        }
      })
    } else {
      console.log("Error delete expense", id);
    }
  }

  private dataForTable() {
    this.prepareDates();

    this.expenseService.getStatisticsByMonth({
      body: this.requestStatistics
    }).subscribe({
      next: result => {
        this.statistics = result;
      },
      error: err => {
        console.log("Error during getting data");
      }
    })
  }

  private prepareDates() {
    const formatDate = (date: Date) => date.toISOString().split('T')[0];
    const starDate = new Date();
    starDate.setDate(1);
    const endDate = new Date(starDate);
    endDate.setMonth(starDate.getMonth() + 1);
    endDate.setDate(0);
    this.requestStatistics = {startDate: formatDate(starDate).toString(), endDate: formatDate(endDate).toString()};
  }

  editExpense(id: number | undefined) {

  }
}
