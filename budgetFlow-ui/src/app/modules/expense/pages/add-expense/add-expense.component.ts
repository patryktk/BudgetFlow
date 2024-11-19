import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ExpenseService} from "../../../../services/services/expense.service";
import {ExpensesCategoryService} from "../../../../services/services/expenses-category.service";
import {ExpenseCategory} from "../../../../services/models/expense-category";

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrl: './add-expense.component.scss'
})
export class AddExpenseComponent implements OnInit {

  expenseForm: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  expenseCategories: Array<ExpenseCategory> = [];


  ngOnInit(): void {
    this.expenseCategoryService.getAllExpenseCategory()
      .subscribe({
        next: result => {
          this.expenseCategories = result;
        },
        error: err => {
          console.log('Błąd podczas pobierania kategorii wydatków: ', err);
        }
      })
  }


  constructor(private expenseService: ExpenseService,
              private formBuilder: FormBuilder,
              private expenseCategoryService: ExpensesCategoryService) {
    this.expenseForm = formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      expenseCategory: ['', [Validators.required]],
      amount: ['', [Validators.required, Validators.min(0.01)]],
      expenseDate: ['', [Validators.required]],
      note: ['', [Validators.maxLength(255)]],
    });
  }

  onSubmit() {
    if (this.expenseForm.valid) {
      this.expenseService.addExpense(this.expenseForm.value).subscribe({
        next: value => {
          this.successMessage = "Wydatek został dodany";
          this.expenseForm.reset();
        },
        error: err => {
          console.log('Błąd podczas dodawania wydatku', err);
          this.errorMessage = err.error?.message || 'Wystąpił błąd. Spróbuj ponownie później.';
        }
      })
    }
  }
}
