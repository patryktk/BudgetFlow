import {Component, OnInit} from '@angular/core';
import {ExpenseService} from "../../../../services/services/expense.service";
import {ExpensesCategoryService} from "../../../../services/services/expenses-category.service";
import {ExpenseCategory} from "../../../../services/models/expense-category";
import {ExpenseRequest} from "../../../../services/models/expense-request";

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.scss']
})
export class AddExpenseComponent implements OnInit {
  expense: ExpenseRequest = {
    name: '',
    expenseCategory: {id: 0, name: ''},
    amount: undefined,
    expenseDate: '',
    note: '',
  };
  expenseCategories: ExpenseCategory[] = [];
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(
    private expenseService: ExpenseService,
    private expenseCategoryService: ExpensesCategoryService
  ) {
  }

  ngOnInit(): void {
    this.expenseCategoryService.getAllExpenseCategory().subscribe({
      next: (categories) => (this.expenseCategories = categories),
      error: (err) => console.error('Błąd ładowania kategorii:', err)
    });
  }

  onSubmit(): void {
    if (this.expense.expenseCategory?.id) {
      this.expenseService.addExpense({body: this.expense}).subscribe({
        next: () => {
          this.successMessage = 'Wydatek został dodany!';
          this.errorMessage = null;
        },
        error: (err) => {
          this.errorMessage = err.error?.message || 'Wystąpił błąd.';
          this.successMessage = null;
        }
      });
    } else {
      this.errorMessage = 'Musisz wybrać kategorię!';
    }
  }
}
