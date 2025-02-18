import {Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {ExpenseService} from "../../../../../services/services/expense.service";
import {ExpenseResponse} from "../../../../../services/models/expense-response";
import {StatisticsByMonthRequest} from "../../../../../services/models/statistics-by-month-request";
import {ExpenseRequest} from "../../../../../services/models/expense-request";
import {UtilsService} from "../../../../../services/utils/utils.service";

@Component({
    selector: 'app-expense-list-calendar',
    templateUrl: './expense-list-calendar.component.html',
    styleUrl: './expense-list-calendar.component.scss',
    standalone: false
})
export class ExpenseListCalendarComponent implements OnInit{

  @Output() formClose = new EventEmitter<void>();
  expenses: ExpenseResponse[] | null = null;
  @Input() dateDay: string | undefined = "";
  requestStatistics: StatisticsByMonthRequest = {startDate: '', endDate: ''}
  showAddExpenseForm = false;
  selectedExpense: ExpenseRequest | null = null;
  @Input() selectedTab: 'all' | 'user' | 'group' = 'all';

  constructor(
    private expenseService: ExpenseService,
    private utilsService: UtilsService,) {
  }

  ngOnInit(): void {
    this.requestStatistics = {startDate: this.dateDay, endDate: this.dateDay};

    this.loadExpenses();
  }

  private loadExpenses() {
    this.expenseService.getAllExpenseByUserByMonth({
      body: this.requestStatistics,
      inGroup: false
    }).subscribe({
      next: result => {
        this.expenses = result;
      },
      error: err => {
        console.log("Error loading expenses list", err);

      }
    })
  }

  deleteExpense(id: number | undefined) {
    if (id !== undefined) {
      this.expenseService.deleteExpense({expenseId: id}).subscribe({
        next: result => {
          this.loadExpenses();
          console.log(result);
        },
        error: err => {
          console.log("Error deleting expense", err);
        }
      })
    }
  }

  editExpense(id: number | undefined) {
    if (id === undefined) {
      console.error('ID cannot be undefined');
      return;
    }

    // Sprawdź, czy expenses są zainicjowane
    if (!this.expenses) {
      console.error('Expenses are not initialized');
      return;
    }
    const find = this.expenses?.find(expense => expense.id === id);
    this.selectedExpense = this.utilsService.mapFormExpenseResponseToExpenseRequest(find)
    this.showAddExpenseForm = true;
  }

  closeAddExpenseForm() {
    this.loadExpenses();
    this.showAddExpenseForm = false;
  }

  @HostListener('document:keydown.escape', ['$event'])
  handleEscapeKey(event: KeyboardEvent) {
    this.closeModal();
  }

  onBackdropClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (target.classList.contains('modal')) {
      this.closeModal();
      this.loadExpenses();
    }
  }

  closeModal() {
    this.formClose.emit()
  }
}
