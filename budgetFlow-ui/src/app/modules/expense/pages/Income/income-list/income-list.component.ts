import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {IncomeResponse} from "../../../../../services/models/income-response";
import {IncomeService} from "../../../../../services/services/income.service";
import {StatisticsByMonthRequest} from "../../../../../services/models/statistics-by-month-request";
import {UtilsService} from "../../../../../services/utils/utils.service";
import {GroupResponseWithUser} from "../../../../../services/models/group-response-with-user";

@Component({
  selector: 'app-income-list',
  templateUrl: './income-list.component.html',
  styleUrl: './income-list.component.scss'
})
export class IncomeListComponent implements OnChanges {

  @Input() selectedTab: 'all' | 'user' | 'group' = 'all';  // Przekazujemy zakładkę z IncomeMainComponent
  @Input() groupResponse: GroupResponseWithUser = {name: '', description: ''};

  incomes: IncomeResponse[] = [];
  showForm = false;
  selectedIncome: IncomeResponse | null = null;
  requestStatistics: StatisticsByMonthRequest = {startDate: '', endDate: ''}
  currentSortField: string = '';
  currentSortDirection: 'asc' | 'desc' = 'asc';

  constructor(
    private incomeService: IncomeService,
    private utilsService: UtilsService,
  ) {
  }

  headers = [
    { field: 'name', label: 'Nazwa' },
    { field: 'amount', label: 'Kwota' },
    { field: 'expenseDate', label: 'Data' }
  ]

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedTab']) {
      this.loadIncomes();
    }
  }

  private loadIncomes() {
    if (this.selectedTab === 'all') {
      this.fetchUserMonthlyIncomes(false);
    } else if(this.selectedTab === 'user') {
      this.fetchUserAllIncomes();
    } else if(this.selectedTab === 'group'){
      this.fetchUserMonthlyIncomes(true);
    }
  }

  openForm() {
    this.selectedIncome = null;
    this.showForm = true;
  }

  closeForm() {
    this.loadIncomes();
    this.showForm = false;
  }

  fetchUserAllIncomes() {
    this.incomeService.getAllIncomeByUser().subscribe({
      next: response => {
        this.incomes = response;
        console.log("All incomes loaded by user", response);
      },
      error: err => {
        console.log("Error loading fetchIncomes list", err);
      }
    })
  }

  private fetchUserMonthlyIncomes(inGroup: boolean) {
    this.requestStatistics = this.utilsService.prepareRequestDatesActiveMonth();
    this.incomeService.getIncomeByUserByMonth({
      body: this.requestStatistics,
      inGroup: inGroup
    }).subscribe({
      next: result => {
        this.incomes = result;
        console.log("Incomes loaded", result);
      },
      error: err => {
        console.log("Error loading fetchIncomes list", err);
      }
    })
  }

  editIncome(income: IncomeResponse) {
    this.selectedIncome = {...income};
    this.showForm = true;
  }

  deleteIncome(id: number | undefined) {
    if (id !== undefined) {
      this.incomeService.deleteIncome({id: id}).subscribe({
        next: result => {
          this.loadIncomes();
          console.log(`Usuwam przychód o id ${id}`);
        },
        error: err => {
          console.log('Error podczas usuwania income od id', id)
        }
      })
    }
  }

  sort(field: string){
    this.currentSortDirection = this.currentSortField === field && this.currentSortDirection === 'asc' ? 'desc' : 'asc';
    this.currentSortField = field;

    this.incomes.sort((a,b) => {
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
