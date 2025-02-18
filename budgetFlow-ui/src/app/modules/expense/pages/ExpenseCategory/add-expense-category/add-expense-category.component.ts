import {Component, inject, OnInit} from '@angular/core';
import {ExpensesCategoryService} from "../../../../../services/services/expenses-category.service";
import {ExpenseCategoryResponse} from "../../../../../services/models/expense-category-response";
import {ExpenseCategoryRequest} from "../../../../../services/models/expense-category-request";
import {MatDialog} from "@angular/material/dialog";
import {DialogExpenseCategoryComponent} from "../dialog-expense-category/dialog-expense-category.component";

@Component({
    selector: 'app-add-expense-category',
    templateUrl: './add-expense-category.component.html',
    styleUrl: './add-expense-category.component.scss',
    standalone: false
})
export class AddExpenseCategoryComponent implements OnInit {

  categories: ExpenseCategoryResponse[] = [];
  newCategory: ExpenseCategoryRequest = {name: '', hexColor: ''}
  color: string = '#fff';
  activeUser = -1;
  dialog = inject(MatDialog);

  constructor(private expensesCategoryService: ExpensesCategoryService) {
  }

  ngOnInit(): void {
    this.getAllExpenseCategory();
    this.checkActiveUser();
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

  private checkActiveUser() {
    const userIdString = sessionStorage.getItem("userId");
    const userId = userIdString ? Number(userIdString) : null;
    if (userId != null) this.activeUser = userId;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogExpenseCategoryComponent, {

    });
  }
}
