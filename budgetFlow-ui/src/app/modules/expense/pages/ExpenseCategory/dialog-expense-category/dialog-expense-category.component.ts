import {Component, inject} from '@angular/core';
import {AddExpenseCategoryComponent} from "../add-expense-category/add-expense-category.component";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-dialog-expense-category',
  standalone: false,
  templateUrl: './dialog-expense-category.component.html',
  styleUrl: './dialog-expense-category.component.scss'
})
export class DialogExpenseCategoryComponent {

  dialogRef = inject(MatDialogRef<AddExpenseCategoryComponent>);

  onNoClick(): void {
    this.dialogRef.close();
  }
}
