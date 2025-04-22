import { Component, inject, Inject, TemplateRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Observable, of } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';

export interface ConfirmDialogData {
  // Podstawowe dane dialogu
  title: string;
  message?: string;
  content?: TemplateRef<any>;

  // Teksty przycisków
  confirmText?: string;
  cancelText?: string;

  // Klasy CSS dla przycisków
  confirmButtonClass?: string;
  cancelButtonClass?: string;

  // Funkcje do wykonania po potwierdzeniu/anulowaniu
  onConfirm?: () => Observable<any> | void;
  onCancel?: () => void;

  // Dodatkowe dane, które mogą być potrzebne dla onConfirm
  payload?: any;
}

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent {
  isLoading = false;
  error: string | null = null;

  private dialogRef = inject(MatDialogRef<ConfirmDialogComponent>);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData
  ) {}

  onConfirmClick(): void {
    if (this.data.onConfirm) {
      const result = this.data.onConfirm();

      if (result instanceof Observable) {
        this.isLoading = true;
        this.error = null;

        result.pipe(
          tap(() => {
            this.dialogRef.close(true);
          }),
          catchError(err => {
            this.error = err.message || 'Wystąpił błąd podczas wykonywania operacji.';
            console.error('Dialog operation error:', err);
            return of(null);
          }),
          finalize(() => {
            this.isLoading = false;
          })
        ).subscribe();
      } else {
        // Jeśli funkcja nie zwraca Observable, po prostu zamknij dialog
        this.dialogRef.close(true);
      }
    } else {
      // Jeśli nie podano funkcji onConfirm, zamknij dialog z wartością true
      this.dialogRef.close(true);
    }
  }

  onCancelClick(): void {
    if (this.data.onCancel) {
      this.data.onCancel();
    }
    this.dialogRef.close(false);
  }
}
