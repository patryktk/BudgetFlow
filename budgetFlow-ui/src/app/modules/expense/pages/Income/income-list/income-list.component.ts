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


  constructor(
    private incomeService: IncomeService,
    private utilsService: UtilsService,
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedTab']) {
      this.loadIncomes();
    }
  }

  private loadIncomes() {
    if (this.selectedTab === 'all') {
      this.fetchUserMonthlyIncomes();
    } else if(this.selectedTab === 'user') {
      this.fetchUserIncomes();
    } else if(this.selectedTab === 'group'){
      this.fetchUserGroupMonthlyIncome();
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

  fetchUserIncomes() {
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

  private fetchUserMonthlyIncomes() {
    this.requestStatistics = this.utilsService.prepareRequestDatesActiveMonth();
    this.incomeService.getIncomeByUserByMonth({
      body: this.requestStatistics
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

  private fetchUserGroupMonthlyIncome() {
    console.log(this.groupResponse);
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

}
