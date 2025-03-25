import {Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {IncomeRequest} from "../../../../../services/models/income-request";
import {IncomeService} from "../../../../../services/services/income.service";
import {IncomeCategory} from "../../../../../services/models/income-category";
import {IncomeCategoryService} from "../../../../../services/services/income-category.service";
import {IncomeCategoryResponse} from "../../../../../services/models/income-category-response";
import {CategoryResponse} from "../../../../../services/models/category-response";
import {CategoryService} from "../../../../../services/services/category.service";
import {CategoryRequest} from "../../../../../services/models/category-request";
import {CategoryType} from "../../../../../services/utils/utils.service";

@Component({
    selector: 'app-income-form',
    templateUrl: './income-form.component.html',
    styleUrl: './income-form.component.scss',
    standalone: false
})
export class IncomeFormComponent implements OnInit {
  @Input() income: IncomeRequest | null = null;
  @Input() selectedTab: 'all' | 'user' | 'group' = 'user'; // Przechowuje aktywną zakładkę
  @Output() formClose = new EventEmitter<void>();

  incomeData: IncomeRequest = {};
  categories: CategoryResponse[] = [];
  categoryRequest: CategoryRequest = {};


  constructor(private incomeService: IncomeService,
              private incomeCategoryService: IncomeCategoryService,
              private categoryService: CategoryService) {
  }

  ngOnInit() {
    this.getIncomeCategories();

    if (this.income) {
      this.incomeData = {...this.income};
    }
  }

  compareCategories(cat1: CategoryRequest, cat2: CategoryRequest): boolean {
    return cat1 && cat2 ? cat1.id === cat2.id : cat1 === cat2;
  }

  submitForm() {
    if (this.income?.id) {
      this.incomeService.updateIncome({body: this.incomeData}).subscribe({
        next: result => {
          console.log('Edit income:', result);
          this.closeModal();
        },
        error: err => {
          console.log('Error: editing income', err);
        }
      })
    } else {
      this.incomeService.addIncome({body: this.incomeData}).subscribe({
        next: result => {
          console.log('Add income: ', result);
          this.closeModal();
        },
        error: err => {
          console.log('Error: adding income', err);
        }
      });
    }
  }

  closeModal() {
    this.formClose.emit();
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

  getIncomeCategories() {
    this.categoryRequest.categoryType = CategoryType.INCOME;
    this.categoryService.getAllCategory({
      body: this.categoryRequest
    }).subscribe({
      next: (result ) =>{
        this.categories = result
      },
      error: (error) => {
        console.error("Błąd podczas pobierania kategorii wydatków:", error);
      }
    })
  }

}
