import {Component, OnInit} from '@angular/core';
import {ExpensesCategoryService} from "../../../../../services/services/expenses-category.service";
import {ExpenseCategoryResponse} from "../../../../../services/models/expense-category-response";
import {ExpenseCategoryRequest} from "../../../../../services/models/expense-category-request";
import {MatDialog} from "@angular/material/dialog";

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

  constructor(private dialog: MatDialog,
              private expensesCategoryService: ExpensesCategoryService) {
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

// Pobierz tylko kategorie główne (bez parentId)
  getRootCategories(): ExpenseCategoryResponse[] {
    return this.categories.filter(category => !category.parentId);
  }

// Pobierz podkategorie dla danej kategorii nadrzędnej
  getSubCategories(parentId: number | undefined): ExpenseCategoryResponse[] {
    return this.categories.filter(category => category.parentId === parentId);
  }

  addCategory() {
    this.newCategory.hexColor = this.color;
    this.expensesCategoryService.saveExpenseCategory({
      body: this.newCategory
    }).subscribe({
      next: result => {
        this.categories.push(result);
      },
      error: err => {
        if (err.error.error) {
          console.log("Error adding Category: ", err.error.error);
        } else {
          console.log("Error adding Category: ", err);
        }
      }
    })
  }

  private checkActiveUser() {
    const userIdString = sessionStorage.getItem("userId");
    const userId = userIdString ? Number(userIdString) : null;
    if (userId != null) this.activeUser = userId;
  }
}
