import {Component, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Subscription} from 'rxjs';
import {finalize} from 'rxjs/operators';

import {ExpenseService} from "../../../../../services/services/expense.service";
import {ExpenseResponse} from "../../../../../services/models/expense-response";
import {StatisticsByMonthRequest} from "../../../../../services/models/statistics-by-month-request";
import {ExpenseRequest} from "../../../../../services/models/expense-request";
import {MapperUtilsService} from "../../../../../services/mapper/mapper-utils.service";

@Component({
  selector: 'app-expense-list-calendar',
  templateUrl: './expense-list-calendar.component.html',
  styleUrl: './expense-list-calendar.component.scss',
  standalone: false
})
export class ExpenseListCalendarComponent implements OnInit, OnDestroy {
  @Output() formClose = new EventEmitter<void>();
  @Input() dateDay: string | undefined = "";
  @Input() selectedTab: 'all' | 'user' | 'group' = 'all';

  expenses: ExpenseResponse[] = [];
  isLoading: boolean = false;
  errorMessage: string = '';
  requestStatistics: StatisticsByMonthRequest = {startDate: '', endDate: ''};
  showAddExpenseForm: boolean = false;
  selectedExpense: ExpenseRequest | null = null;

  private subscriptions: Subscription = new Subscription();

  constructor(
    private expenseService: ExpenseService,
    private mapperUtilsService: MapperUtilsService,
  ) {
  }

  ngOnInit(): void {
    this.requestStatistics = {
      startDate: this.dateDay,
      endDate: this.dateDay
    };
    this.loadExpenses();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  deleteExpense(id: number | undefined): void {
    if (id === undefined) {
      console.error('Cannot delete expense with undefined ID');
      return;
    }

    if (confirm('Czy na pewno chcesz usunąć ten wydatek?')) {
      this.isLoading = true;
      const subscription = this.expenseService.deleteExpense({expenseId: id})
        .pipe(finalize(() => this.isLoading = false))
        .subscribe({
          next: () => {
            this.loadExpenses();
          },
          error: (err) => {
            this.errorMessage = 'Błąd podczas usuwania wydatku';
            console.error("Error deleting expense", err);
          }
        });

      this.subscriptions.add(subscription);
    }
  }

  editExpense(id: number | undefined): void {
    if (id === undefined) {
      console.error('ID cannot be undefined');
      return;
    }

    if (!this.expenses) {
      console.error('Expenses are not initialized');
      return;
    }

    const expense = this.expenses.find(expense => expense.id === id);
    if (expense) {
      this.selectedExpense = this.mapperUtilsService.mapFromExpenseResponseToExpenseRequest(expense);
      this.showAddExpenseForm = true;
    } else {
      console.error(`Expense with ID ${id} not found`);
    }
  }

  closeAddExpenseForm(): void {
    this.loadExpenses();
    this.showAddExpenseForm = false;
    this.selectedExpense = null;
  }

  @HostListener('document:keydown.escape')
  handleEscapeKey(): void {
    this.closeModal();
  }

  onBackdropClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (target.classList.contains('modal')) {
      this.closeModal();
    }
  }

  closeModal(): void {
    this.formClose.emit();
  }

  private loadExpenses(): void {
    this.isLoading = true;
    this.errorMessage = '';

    const subscription = this.expenseService.getAllExpenseByUserByMonth({
      body: this.requestStatistics,
      inGroup: false
    })
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (result) => {
          this.expenses = result || [];
        },
        error: (err) => {
          this.errorMessage = 'Błąd podczas ładowania wydatków';
          console.error("Error loading expenses list", err);
        }
      });

    this.subscriptions.add(subscription);
  }
}
