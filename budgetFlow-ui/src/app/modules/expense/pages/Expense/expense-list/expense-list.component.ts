import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {ExpenseResponse} from "../../../../../services/models/expense-response";
import {StatisticsByMonthRequest} from "../../../../../services/models/statistics-by-month-request";
import {ExpenseService} from "../../../../../services/services/expense.service";
import {ExpenseRequest} from "../../../../../services/models/expense-request";
import {UtilsService} from "../../../../../services/utils/utils.service";
import {MapperUtilsService} from "../../../../../services/mapper/mapper-utils.service";

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrl: './expense-list.component.scss',
  standalone: false
})
export class ExpenseListComponent implements OnChanges {

  @Input() selectedTab: 'all' | 'user' | 'group' = 'all';

  expenses: ExpenseResponse[] = [];
  showForm = false;
  selectedExpense: ExpenseRequest | null = null;
  requestStatistics: StatisticsByMonthRequest = {startDate: '', endDate: ''}
  currentSortField: string = '';
  currentSortDirection: 'asc' | 'desc' = 'asc';

  constructor(
    private expenseService: ExpenseService,
    private utilsService: UtilsService,
    private mapperUtilsService: MapperUtilsService,
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedTab']) {
      this.loadExpenses();
    }
  }

  headers = [
    {field: 'name', label: 'Nazwa'},
    {field: 'amount', label: 'Kwota'},
    {field: 'expenseDate', label: 'Data'},
    {field: 'note', label: 'Notatka'},
    {field: 'userId', label: 'Kto stworzył'},
    {field: 'createdDate', label: 'Data dodania'},
    {field: 'lastModifiedDate', label: 'Data modyfikacji'},
  ]

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

  editExpense(expenseResponse: ExpenseResponse) {
    this.selectedExpense = {...this.mapperUtilsService.mapFromExpenseResponseToExpenseRequest(expenseResponse)} //kopiowanie obiektu expense do nowego obiektu
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

  sort(field: string) {
    this.currentSortDirection = this.currentSortField === field && this.currentSortDirection === 'asc' ? 'desc' : 'asc';
    this.currentSortField = field;

    this.expenses.sort((a, b) => {
      const aValue = a[field];
      const bValue = b[field];

      if (aValue < bValue) {
        return this.currentSortDirection === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return this.currentSortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }
}
