import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

export interface ConfirmCategoryDialogData {
  title: string;
  message: string;
}

@Component({
  selector: 'app-confirm-dialog-category',
  standalone: false,
  templateUrl: './confirm-dialog-category.component.html',
  styleUrl: './confirm-dialog-category.component.scss'
})
export class ConfirmDialogCategoryComponent {

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmCategoryDialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    this.dialogRef.close(true);
  }
}
