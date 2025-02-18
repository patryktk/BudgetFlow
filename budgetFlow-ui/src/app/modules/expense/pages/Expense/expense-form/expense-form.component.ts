import {Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {ExpenseRequest} from "../../../../../services/models/expense-request";
import {ExpenseService} from "../../../../../services/services/expense.service";
import {ExpenseCategory} from "../../../../../services/models/expense-category";
import {ExpensesCategoryService} from "../../../../../services/services/expenses-category.service";

@Component({
    selector: 'app-expense-form',
    templateUrl: './expense-form.component.html',
    styleUrl: './expense-form.component.scss',
    standalone: false
})
export class ExpenseFormComponent implements OnInit {

  @Input() expense: ExpenseRequest | null = null;
  @Input() selectedTab: 'all' | 'user' | 'group' = 'user';
  @Output() formClose = new EventEmitter<void>();

  expenseData: ExpenseRequest = {name: ""}
  expenseCategories: ExpenseCategory[] = [];


  constructor(private expenseService: ExpenseService,
              private expenseCategoryService: ExpensesCategoryService) {
  }

  ngOnInit(): void {
    this.getExpenseCategories();

    if (this.expense) {
      this.expenseData = {...this.expense};
    }
  }

  compareCategories(cat1: ExpenseCategory, cat2: ExpenseCategory): boolean {
    return cat1 && cat2 ? cat1.id === cat2.id : cat1 === cat2;
  }

  private getExpenseCategories() {
    this.expenseCategoryService.getAllExpenseCategory().subscribe({
      next: result => {
        this.expenseCategories = result;
      },
      error: err => {
        console.log("Error loading expense category list", err);
      }
    })
  }

  submitForm() {
    if (this.expense?.id) {
      this.expenseService.updateExpense({
        body: this.expenseData
      }).subscribe({
        next: result => {
          console.log("Edited expense:", result);
          this.closeModal();
        },
        error: err => {
          console.log("Error: edit expense:", err);
        }
      })
    } else {
      this.expenseService.addExpense({
        body: this.expenseData
      }).subscribe({
        next: result => {
          console.log("Add expense:", result);
          this.closeModal();
        },
        error: err => {
          console.log("Error: add expense:", err);
        }
      })
    }
  }

  private closeModal() {
    this.formClose.emit()
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
}
