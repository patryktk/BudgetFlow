import {Component, OnInit} from '@angular/core';
import {ExpenseService} from "../../../../services/services/expense.service";
import {ExpenseResponse} from "../../../../services/models/expense-response";

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrl: './expense-list.component.scss'
})
export class ExpenseListComponent implements OnInit{

  expenses: ExpenseResponse[] = [];

  constructor(private expenseService: ExpenseService) {
  }

  ngOnInit(): void {
    this.expenseService.getAllExpensesByUser().subscribe({
      next: result => {
        console.log(result)
        this.expenses = result;
      },
      error: err => {
        console.log("Error loading expenses list", err);
      }
    })
  }


}
