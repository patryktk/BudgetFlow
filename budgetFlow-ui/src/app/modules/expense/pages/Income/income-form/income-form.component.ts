import {Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {IncomeRequest} from "../../../../../services/models/income-request";
import {IncomeService} from "../../../../../services/services/income.service";
import {IncomeCategory} from "../../../../../services/models/income-category";
import {IncomeCategoryService} from "../../../../../services/services/income-category.service";
import {IncomeCategoryResponse} from "../../../../../services/models/income-category-response";

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
  incomeCategories: IncomeCategoryResponse[] = [];

  constructor(private incomeService: IncomeService,
              private incomeCategoryService: IncomeCategoryService) {
  }

  ngOnInit() {
    this.getIncomeCategories();

    if (this.income) {
      this.incomeData = {...this.income};
    }
  }

  compareCategories(cat1: IncomeCategory, cat2: IncomeCategory): boolean {
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

  private getIncomeCategories() {
    this.incomeCategoryService.getAllIncomeCategories().subscribe({
      next: result => {
        this.incomeCategories = result;
        console.log(result)
      },
      error: err => {
        console.log('Error: getting income categories ', err)
      }
    })
  }
}
