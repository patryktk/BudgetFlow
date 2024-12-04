// import {Component, OnInit} from '@angular/core';
// import {ExpenseService} from "../../../../../services/services/expense.service";
// import {ExpenseResponse} from "../../../../../services/models/expense-response";
// import {ExpenseResponseForStatistics} from "../../../../../services/models/expense-response-for-statistics";
// import {StatisticsByMonthRequest} from "../../../../../services/models/statistics-by-month-request";
// import {UtilsService} from "../../../../../services/utils/utils.service";
//
// @Component({
//   selector: 'app-expense-list',
//   templateUrl: './expense-listt.component.html',
//   styleUrl: './expense-listt.component.scss'
// })
// export class ExpenseListComponent implements OnInit{
//   expenses: ExpenseResponse[] = [];
//   statistics: ExpenseResponseForStatistics[] = []
//   requestStatistics: StatisticsByMonthRequest = {startDate: '', endDate: ''}
//
//   selectedExpense: any = null;
//
//   private modalInstance: any;
//
//   constructor(private expenseService: ExpenseService,
//               private utilsService: UtilsService,) {
//   }
//
//   ngOnInit(): void {
//     this.loadExpense();
//   }
//
//   deleteExpense(id: number | undefined) {
//     if (id !== undefined) {
//       this.expenseService.deleteExpense({expenseId: id}).subscribe({
//         next: result => {
//           this.expenses = this.expenses.filter(expense => expense.id !== id);
//         },
//         error: err => {
//           console.log("Error deleting expense");
//         }
//       })
//     } else {
//       console.log("Error delete expense", id);
//     }
//   }
//
//   private dataForTable() {
//     this.requestStatistics = this.utilsService.prepareRequestDatesActiveMonth();
//
//     this.expenseService.getStatisticsByMonth({
//       body: this.requestStatistics
//     }).subscribe({
//       next: result => {
//         this.statistics = result;
//       },
//       error: err => {
//         console.log("Error during getting data");
//       }
//     })
//   }
//
//   editExpense(expense: any) {
//     this.selectedExpense = {...expense}; // Kopia obiektu wydatku
//
//     setTimeout(() => {
//       const modalElement = document.getElementById('editExpenseModal');
//       if (modalElement) {
//         this.modalInstance = new bootstrap.Modal(modalElement)
//         this.modalInstance.show();
//       } else {
//         console.error('Modal element not found!');
//       }
//     }, 0);
//   }
//
//   updateExpense(updatedExpense: any) {
//     this.expenseService.updateExpense({body: updatedExpense}).subscribe({
//       next: result => {
//         console.log("Successfully updated expense", result)
//
//         if(this.modalInstance){
//           this.modalInstance.hide();
//         }else{
//           console.log("Modal not found")
//         }
//
//         this.loadExpense();
//       }
//     })
//   }
//
//   private loadExpense() {
//     this.expenseService.getAllExpensesByUser().subscribe({
//       next: result => {
//         this.expenses = result;
//         this.dataForTable();
//       },
//       error: err => {
//         console.log("Error loading expenses list", err);
//       }
//     });
//   }
// }
