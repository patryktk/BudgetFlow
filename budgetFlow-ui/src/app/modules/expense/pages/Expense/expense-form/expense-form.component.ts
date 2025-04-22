import {Component, EventEmitter, HostListener, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ExpenseRequest} from "../../../../../services/models/expense-request";
import {ExpenseService} from "../../../../../services/services/expense.service";
import {ExpensesCategoryService} from "../../../../../services/services/expenses-category.service";
import {NgForm} from "@angular/forms";
import {finalize} from "rxjs/operators";
import {ExpenseCategoryResponse} from "../../../../../services/models/expense-category-response";
import {ExpenseCategoryRequest} from "../../../../../services/models/expense-category-request";
import {CategoryService} from "../../../../../services/services/category.service";
import {CategoryType} from "../../../../../services/utils/utils.service";
import {CategoryRequest} from "../../../../../services/models/category-request";
import {CategoryResponse} from "../../../../../services/models/category-response";

@Component({
  selector: 'app-expense-form',
  templateUrl: './expense-form.component.html',
  styleUrl: './expense-form.component.scss',
  standalone: false
})
export class ExpenseFormComponent implements OnInit {
  @ViewChild('expenseForm') expenseForm!: NgForm;
  @Input() expense: ExpenseRequest | null = null;
  @Input() selectedTab: 'all' | 'user' | 'group' = 'user';
  @Output() formClose = new EventEmitter<void>();

  expenseData: ExpenseRequest = {
    expenseDate: this.getCurrentDate(),
  };

  isSubmitting = false;
  errorMessage: string | null = null;
  expenseCategories: ExpenseCategoryResponse[] = [];
  categoryRequest: CategoryRequest = {};
  categories: CategoryResponse[] = [];

  constructor(
    private expenseService: ExpenseService,
    private expenseCategoryService: ExpensesCategoryService,
    private categoryService: CategoryService
  ) {
  }

  ngOnInit(): void {
    this.loadExpenseCategories();

    if (this.expense) {
      this.expenseData = {...this.expense};
    }
  }

  /**
   * Porównuje dwie kategorie wydatków na podstawie ich identyfikatorów
   */
  compareCategories(cat1: CategoryRequest, cat2: CategoryRequest): boolean {
    return cat1 && cat2 ? cat1.id === cat2.id : cat1 === cat2;
  }

  /**
   * Pobiera listę wszystkich kategorii wydatków
   */
  private loadExpenseCategories(): void {
    // this.expenseCategoryService.getAllExpenseCategory().subscribe({
    //   next: (categories) => {
    //     this.expenseCategories = categories;
    //
    //     // Jeśli edytujemy wydatek, upewnij się, że kategoria jest poprawnie wybrana
    //     if (this.expense?.expenseCategoryRequest && this.expense.expenseCategoryRequest.id) {
    //       const matchingCategory = this.expenseCategories.find(
    //         category => category.id === this.expense?.expenseCategoryRequest?.id
    //       );
    //
    //       if (matchingCategory) {
    //         this.expenseData.expenseCategoryRequest = matchingCategory;
    //       }
    //     }
    //   },
    //   error: (error) => {
    //     console.error("Błąd podczas pobierania kategorii wydatków:", error);
    //     this.errorMessage = "Nie udało się załadować kategorii wydatków. Spróbuj ponownie później.";
    //   }
    // });

    this.categoryRequest.categoryType = CategoryType.EXPENSE;
    this.categoryService.getAllCategory({
      body: this.categoryRequest
    }).subscribe({
      next: (categories) => {
        this.categories = categories;

        // Jeśli edytujemy wydatek, upewnij się, że kategoria jest poprawnie wybrana
        if (this.expense?.categoryRequest && this.expense.categoryRequest.id) {
          const matchingCategory = this.expenseCategories.find(
            category => category.id === this.expense?.categoryRequest?.id
          );

          if (matchingCategory) {
            this.expenseData.categoryRequest = matchingCategory;
          }
        }
      },
      error: (error) => {
        console.error("Błąd podczas pobierania kategorii wydatków:", error);
        this.errorMessage = "Nie udało się załadować kategorii wydatków. Spróbuj ponownie później.";
      }
    })
  }

  /**
   * Przesyła formularz do zapisania lub aktualizacji wydatku
   */
  submitForm(): void {
    if (this.expenseForm.invalid || this.isSubmitting) {
      // Oznacz wszystkie pola jako dotknięte, aby pokazać błędy walidacji
      Object.keys(this.expenseForm.controls).forEach(key => {
        this.expenseForm.controls[key].markAsTouched();
      });
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = null;

    const operation = this.expense?.id
      ? this.expenseService.updateExpense({body: this.expenseData})
      : this.expenseService.addExpense({body: this.expenseData});

    operation
      .pipe(finalize(() => this.isSubmitting = false))
      .subscribe({
        next: (result) => {
          console.log(`Wydatek ${this.expense?.id ? 'zaktualizowany' : 'dodany'} pomyślnie:`, result);
          this.closeModal();
        },
        error: (error) => {
          console.error(`Błąd podczas ${this.expense?.id ? 'aktualizacji' : 'dodawania'} wydatku:`, error);
          this.errorMessage = `Nie udało się ${this.expense?.id ? 'zaktualizować' : 'dodać'} wydatku. Sprawdź wprowadzone dane.`;
        }
      });
  }

  /**
   * Zamyka modal formularza
   */
  closeModal(): void {
    this.formClose.emit();
  }

  /**
   * Zwraca aktualną datę w formacie YYYY-MM-DD
   */
  private getCurrentDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  /**
   * Obsługuje naciśnięcie klawisza Escape
   */
  @HostListener('document:keydown.escape')
  handleEscapeKey(): void {
    this.closeModal();
  }

  /**
   * Obsługuje kliknięcie w tło modalu
   */
  onBackdropClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (target.classList.contains('modal')) {
      this.closeModal();
    }
  }
}
