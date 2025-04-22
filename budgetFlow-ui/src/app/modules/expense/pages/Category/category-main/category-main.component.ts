import {Component, OnInit} from '@angular/core';
import {CategoryType} from "../../../../../services/utils/utils.service";
import {CategoryRequest} from "../../../../../services/models/category-request";
import {CategoryResponse} from "../../../../../services/models/category-response";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ExpensesCategoryService} from "../../../../../services/services/expenses-category.service";
import {IncomeCategoryService} from "../../../../../services/services/income-category.service";
import {MatTabChangeEvent} from "@angular/material/tabs";
import {CategoryService} from "../../../../../services/services/category.service";
import {ConfirmDialogCategoryComponent} from "../confirm-dialog-category/confirm-dialog-category.component";

@Component({
  selector: 'app-category-main',
  standalone: false,
  templateUrl: './category-main.component.html',
  styleUrl: './category-main.component.scss'
})
export class CategoryMainComponent implements OnInit {
  expenseCategories: CategoryResponse[] = [];
  incomeCategories: CategoryResponse[] = [];
  activeUser: number = -1;
  activeTab: CategoryType = CategoryType.EXPENSE;
  showExpenseForm: boolean = false;
  showIncomeForm: boolean = false;
  editingExpenseCategory: CategoryResponse | null = null;
  editingIncomeCategory: CategoryResponse | null = null;

  // Expose enum to template
  categoryType = CategoryType;
  categoryRequest: CategoryRequest = {};

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private categoryService: CategoryService,
  ) {
  }

  ngOnInit(): void {
    this.checkActiveUser();
    this.getExpenseCategories();
    this.getIncomeCategories();
  }

  onTabChange(event: MatTabChangeEvent): void {
    this.activeTab = event.index === 0 ? CategoryType.EXPENSE : CategoryType.INCOME;
    this.resetForms();
  }

  getExpenseCategories(): void {
    this.categoryRequest.categoryType = CategoryType.EXPENSE;
    this.categoryService.getAllCategory({
      body: this.categoryRequest
    }).subscribe({
      next: result => {
        this.expenseCategories = result;
      },
      error: err => {
        this.showError("Błąd podczas ładowania kategorii wydatków");
      }
    })
  }

  getIncomeCategories(): void {
    this.categoryRequest.categoryType = CategoryType.INCOME;
    this.categoryService.getAllCategory({
      body: this.categoryRequest
    }).subscribe({
      next: result => {
        this.incomeCategories = result;
      },
      error: err => {
        this.showError("Błąd podczas ładowania kategorii wydatków");
      }
    })
  }

  toggleExpenseForm(): void {
    this.showExpenseForm = !this.showExpenseForm;
    if (!this.showExpenseForm) {
      this.editingExpenseCategory = null;
    }
  }

  toggleIncomeForm(): void {
    this.showIncomeForm = !this.showIncomeForm;
    if (!this.showIncomeForm) {
      this.editingIncomeCategory = null;
    }
  }

  resetForms(): void {
    this.showExpenseForm = false;
    this.showIncomeForm = false;
    this.editingExpenseCategory = null;
    this.editingIncomeCategory = null;
  }

  // Get expense root categories for the form
  getExpenseRootCategories(): CategoryResponse[] {
    return this.expenseCategories.filter(category => !category.parentId);
  }

  // Get income root categories for the form
  getIncomeRootCategories(): CategoryResponse[] {
    return this.incomeCategories;
  }

  // Edit expense category
  editExpenseCategory(category: CategoryResponse): void {
    this.editingExpenseCategory = {...category};
    this.showExpenseForm = true;
  }

  // Edit income category
  editIncomeCategory(category: CategoryResponse): void {
    this.editingIncomeCategory = {...category};
    this.showIncomeForm = true;
  }

  // Submit expense category form
  submitExpenseCategory(categoryRequest: CategoryRequest): void {
    if (this.editingExpenseCategory) {
      this.updateExpenseCategory(this.editingExpenseCategory.id!, categoryRequest);
    } else {
      this.addCategory(categoryRequest);
    }
  }

  // Submit income category form
  submitIncomeCategory(categoryRequest: CategoryRequest): void {
    if (this.editingIncomeCategory) {
      this.updateIncomeCategory(this.editingIncomeCategory.id!, categoryRequest);
    } else {
      this.addIncomeCategory(categoryRequest);
    }
  }

  // Add category
  addCategory(category: CategoryRequest): void {
    this.categoryService.saveCategory({
      body: category
    }).subscribe({
      next: result => {
        if(category.categoryType == CategoryType.EXPENSE) {
          this.expenseCategories.push(result);
        }else{
          this.incomeCategories.push(result);
        }
        this.showSuccess("Kategoria wydatków dodana pomyślnie");
        this.toggleExpenseForm();
      },
      error: err => {
        this.showError("Błąd podczas dodawania kategorii wydatków");
      }
    })
  }

  // Update expense category
  updateExpenseCategory(id: number, category: CategoryRequest): void {
    category.id = id;
    this.categoryService.editCategory({
      body: category
    }).subscribe({
      next: (result) => {
        const index = this.expenseCategories.findIndex(cat => cat.id === id);
        if (index !== -1) {
          this.expenseCategories[index] = result;
        }
        this.showSuccess("Kategoria wydatków zaktualizowana pomyślnie");
        this.editingExpenseCategory = null;
        this.toggleExpenseForm();
      },
      error: (err) => {
        this.showError("Błąd podczas aktualizacji kategorii wydatków");
      }
    });
  }

  // Delete expense category
  deleteExpenseCategory(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogCategoryComponent, {
      data: {
        title: 'Potwierdź usunięcie',
        message: 'Czy na pewno chcesz usunąć tę kategorię wydatków?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.categoryService.deleteCategory({
          categoryId: id
        }).subscribe({
          next: () => {
            this.expenseCategories = this.expenseCategories.filter(cat => cat.id !== id);
            this.showSuccess("Kategoria wydatków usunięta pomyślnie");
          },
          error: (err) => {
            this.showError("Błąd podczas usuwania kategorii wydatków");
          }
        });
      }
    });
  }

  // Add income category
  addIncomeCategory(category: CategoryRequest): void {
    // this.incomeCategoryService.createIncomeCategory({
    //   body: category
    // }).subscribe({
    //   next: (result) => {
    //     this.incomeCategories.push(result);
    //     this.showSuccess("Kategoria przychodów dodana pomyślnie");
    //     this.toggleIncomeForm();
    //   },
    //   error: (err) => {
    //     this.showError("Błąd podczas dodawania kategorii przychodów");
    //   }
    // });
  }

  // Update income category
  updateIncomeCategory(id: number, category: CategoryRequest): void {
    // this.incomeCategoryService.updateIncomeCategory({
    //   incomeCategoryId: id,
    //   body: category
    // }).subscribe({
    //   next: (result) => {
    //     const index = this.incomeCategories.findIndex(cat => cat.id === id);
    //     if (index !== -1) {
    //       this.incomeCategories[index] = result;
    //     }
    //     this.showSuccess("Kategoria przychodów zaktualizowana pomyślnie");
    //     this.editingIncomeCategory = null;
    //     this.toggleIncomeForm();
    //   },
    //   error: (err) => {
    //     this.showError("Błąd podczas aktualizacji kategorii przychodów");
    //   }
    // });
  }

  // Delete income category
  deleteIncomeCategory(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogCategoryComponent, {
      data: {
        title: 'Potwierdź usunięcie',
        message: 'Czy na pewno chcesz usunąć tę kategorię przychodów?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.categoryService.deleteCategory({
          categoryId: id
        }).subscribe({
          next: () => {
            this.incomeCategories = this.incomeCategories.filter(cat => cat.id !== id);
            this.showSuccess("Kategoria przychodów usunięta pomyślnie");
          },
          error: (err) => {
            this.showError("Błąd podczas usuwania kategorii przychodów");
          }
        });
      }
    });
  }

  // Handle form cancel
  onFormCancel(): void {
    if (this.activeTab === CategoryType.EXPENSE) {
      this.toggleExpenseForm();
    } else {
      this.toggleIncomeForm();
    }
  }

  // Check active user
  private checkActiveUser(): void {
    const userIdString = sessionStorage.getItem("userId");
    const userId = userIdString ? Number(userIdString) : null;
    if (userId != null) this.activeUser = userId;
  }

  // Show success message
  private showSuccess(message: string): void {
    this.snackBar.open(message, 'Zamknij', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['success-snackbar']
    });
  }

  // Show error message
  private showError(message: string): void {
    this.snackBar.open(message, 'Zamknij', {
      duration: 5000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['error-snackbar']
    });
  }
}
