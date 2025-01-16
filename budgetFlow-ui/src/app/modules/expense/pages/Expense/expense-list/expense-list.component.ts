import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {ExpenseResponse} from "../../../../../services/models/expense-response";
import {StatisticsByMonthRequest} from "../../../../../services/models/statistics-by-month-request";
import {ExpenseService} from "../../../../../services/services/expense.service";
import {ExpenseRequest} from "../../../../../services/models/expense-request";
import {UtilsService} from "../../../../../services/utils/utils.service";

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrl: './expense-list.component.scss'
})
export class ExpenseListComponent implements OnChanges {

  @Input() selectedTab: 'all' | 'user' | 'group' = 'all';

  expenses: ExpenseResponse[] = [];
  showForm = false;
  selectedExpense: ExpenseRequest | null = null;
  requestStatistics: StatisticsByMonthRequest = {startDate: '', endDate: ''}

  constructor(
    private expenseService: ExpenseService,
    private utilsService: UtilsService,
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedTab']) {
      this.loadExpenses();
    }
  }

  private loadExpenses() {
    if (this.selectedTab === 'all') {
      this.fetchUserMonthlyExpenses(false);
    } else if (this.selectedTab === 'user') {
      this.fetchUserAllExpenses();
    } else if (this.selectedTab === 'group') {
      this.fetchUserMonthlyExpenses(true);
    }
  }

  openForm() {
    this.selectedExpense = null;
    this.showForm = true;
  }

  closeForm() {
    this.loadExpenses();
    this.showForm = false;
  }

  private fetchUserMonthlyExpenses(inGroup: boolean) {
    this.requestStatistics = this.utilsService.prepareRequestDatesActiveMonth();
    console.log(this.requestStatistics)

    this.expenseService.getAllExpenseByUserByMonth({
      body: this.requestStatistics,
      inGroup: inGroup
    }).subscribe({
      next: result => {
        this.expenses = result;
        console.log("Expenses loaded", result);
      },
      error: err => {
        console.log("Error during getting expenses data", err);
      }
    })
  }

  private fetchUserAllExpenses() {
    this.expenseService.getAllExpensesByUser().subscribe({
      next: response => {
        this.expenses = response;
      },
      error: err => {
        console.log("Error loading expenses list", err);
      }
    })
  }

  mapToExpenseRequest(expense: any): ExpenseRequest {
    return {
      id: expense.id,  // Możesz pominąć id, jeśli jest opcjonalne w ExpenseRequest
      name: expense.name,
      expenseCategory: expense.expenseCategory ? {
        id: expense.expenseCategory.id,
        name: expense.expenseCategory.name
      } : undefined, // Jeśli expenseCategory jest dostępne, przypisuje go, w przeciwnym razie undefined
      amount: expense.amount,
      expenseDate: expense.expenseDate,
      note: expense.note
    };
  }

  editExpense(expense: ExpenseResponse) {
    this.selectedExpense = {...this.mapToExpenseRequest(expense)} //kopiowanie obiektu expense do nowego obiektu
    this.showForm = true;
  }

  deleteExpense(id: number | undefined) {
    if (id !== undefined) {
      this.expenseService.deleteExpense({expenseId: id}).subscribe({
        next: result => {
          this.loadExpenses();
          console.log("Deleted expense", id, result);
        },
        error: err => {
          console.log("Error deleting expense", id, err);
        }
      })
    }
  }
}
