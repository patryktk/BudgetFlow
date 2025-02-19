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

  private dialog = inject(MatDialog);
  private expensesCategoryService = inject(ExpensesCategoryService)

  constructor() {
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

  openDialog(categoryId: number | undefined): void {
    const dialogRef = this.dialog.open(DialogExpenseCategoryComponent, {
      data: {id: categoryId}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'deleted') {
        console.log("Kategoria została usunięta");
        this.categories = this.categories.filter(category => category.id !== categoryId);
      }
    })
  }
}
