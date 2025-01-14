import {Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {ExpenseRequest} from "../../../../../services/models/expense-request";
import {ExpenseService} from "../../../../../services/services/expense.service";
import {ExpenseResponse} from "../../../../../services/models/expense-response";

@Component({
  selector: 'app-expense-list-calendar',
  templateUrl: './expense-list-calendar.component.html',
  styleUrl: './expense-list-calendar.component.scss'
})
export class ExpenseListCalendarComponent implements OnInit{

  @Output() formClose = new EventEmitter<void>();
  expenses: ExpenseResponse[] | null = null;
  showForm = false;

  constructor(
    private expenseService:ExpenseService) {
  }

  ngOnInit(): void {
    this.expenseService.getAllExpensesByUser().subscribe({
      next: result => {
        this.expenses = result;
        console.log(result);
      },
      error: err => {
        console.log("Error loading expenses list", err);
      }
    })
  }


  closeForm() {
    this.showForm = false;
  }

  @HostListener('document:keydown.escape', ['$event'])
  handleEscapeKey(event: KeyboardEvent) {
    this.closeModal();
  }

  onBackdropClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (target.classList.contains('modal')) {
      this.closeModal();
    }
  }

  private closeModal() {
    this.formClose.emit()
  }
}
