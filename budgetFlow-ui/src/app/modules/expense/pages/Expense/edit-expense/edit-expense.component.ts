import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ExpenseCategory} from "../../../../../services/models/expense-category";
import {ExpensesCategoryService} from "../../../../../services/services/expenses-category.service";
import {ExpenseRequest} from "../../../../../services/models/expense-request";

@Component({
  selector: 'app-edit-expense',
  templateUrl: './edit-expense.component.html',
  styleUrl: './edit-expense.component.scss'
})
export class EditExpenseComponent implements OnInit {
  expenseCategories: ExpenseCategory[] = [];

  @Input() expense: any; // Otrzymuje wydatek do edycji
  @Output() save = new EventEmitter<ExpenseRequest>();

  constructor(
    private expenseCategoryService: ExpensesCategoryService
  ) {
  }

  ngOnInit(): void {
    this.expenseCategoryService.getAllExpenseCategory().subscribe({
      next: (categories) => (this.expenseCategories = categories),
      error: (err) => console.error('Błąd ładowania kategorii:', err)
    });
  }

  compareCategories(cat1: ExpenseCategory, cat2: ExpenseCategory): boolean {
    return cat1 && cat2 ? cat1.id === cat2.id : cat1 === cat2;
  }

  mapToExpenseRequest(expense: any): ExpenseRequest {
    return {
      id: expense.id,  // Możesz pominąć id, jeśli jest opcjonalne w ExpenseRequest
      name: expense.name,
      expenseCategory: expense.expenseCategory ? {
        id: expense.expenseCategory.id,
        name: expense.expenseCategory.name
      } : undefined, // Jeśli expenseCategory jest dostępne, przypisuje go, w przeciwnym razie undefined
      amount: expense.amount,
      expenseDate: expense.expenseDate,
      note: expense.note
    };
  }

  onSubmit() {
    const expenseRequest: ExpenseRequest = this.mapToExpenseRequest(this.expense);
    this.save.emit(expenseRequest); // Emituje zmienione dane wydatku
  }
}
