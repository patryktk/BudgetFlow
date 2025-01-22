import {Component, OnInit} from '@angular/core';
import {ExpensesCategoryService} from "../../../../../services/services/expenses-category.service";
import {ExpenseCategoryResponse} from "../../../../../services/models/expense-category-response";
import {TokenService} from "../../../../../services/token/token.service";
import {ExpenseCategoryRequest} from "../../../../../services/models/expense-category-request";

@Component({
  selector: 'app-add-expense-category',
  templateUrl: './add-expense-category.component.html',
  styleUrl: './add-expense-category.component.scss'
})
export class AddExpenseCategoryComponent implements OnInit {

  categories: ExpenseCategoryResponse[] = [];
  newCategory: ExpenseCategoryRequest = {name: '', hexColor: ''}
  color: string = '#fff';
  isOwner = false;

  constructor(private expensesCategoryService: ExpensesCategoryService,
              private tokenService: TokenService) {
  }

  ngOnInit(): void {
    this.getAllExpenseCategory();
  }

  getAllExpenseCategory() {
    this.expensesCategoryService.getAllExpenseCategory().subscribe({
      next: result => {
        this.categories = result;
      },
      error: err => {
        console.log("Error loading expenses list", err);
      }
    })
  }


  deleteCategory(id: number | undefined) {
    if (id !== undefined) {
      this.expensesCategoryService.deleteExpenseCategory({expenseCategoryId: id}).subscribe({
        next: result => {
          this.categories = this.categories.filter(category => category.id !== id);
        },
        error: err => {
          console.log("Error deleting expense", err);
        }
      })
    } else {
      console.log("Error deleting expense, id unidentified");
    }
  }

  addCategory() {
    this.newCategory.hexColor = this.color;
    this.expensesCategoryService.saveExpenseCategory({
      body: this.newCategory
    }).subscribe({
      next: result => {
        this.categories.push(result);
      }
    })
  }
}
