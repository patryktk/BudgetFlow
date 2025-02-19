import {Component, inject, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ExpensesCategoryService} from "../../../../../services/services/expenses-category.service";

@Component({
  selector: 'app-dialog-expense-category',
  standalone: false,
  templateUrl: './dialog-expense-category.component.html',
  styleUrl: './dialog-expense-category.component.scss'
})
export class DialogExpenseCategoryComponent {

  private expensesCategoryService = inject(ExpensesCategoryService);
  private dialogRef = inject(MatDialogRef);

  constructor(@Inject(MAT_DIALOG_DATA) public data: { id: number | undefined }) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick(): void {
    if (this.data.id !== undefined) {
      this.expensesCategoryService.deleteExpenseCategory({expenseCategoryId: this.data.id}).subscribe(() => {
        this.dialogRef.close('deleted');
      })
    }
  }
}
