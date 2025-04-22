import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {CategoryType} from "../../../../../services/utils/utils.service";
import {CategoryRequest} from "../../../../../services/models/category-request";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CategoryResponse} from "../../../../../services/models/category-response";

@Component({
  selector: 'app-category-form',
  standalone: false,
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.scss'
})
export class CategoryFormComponent implements OnChanges {
  @Input() rootCategories: CategoryResponse[] = [];
  @Input() editingCategory: CategoryResponse | null = null;
  @Input() type: CategoryType = CategoryType.EXPENSE;
  @Input() isVisible: boolean = false;

  @Output() formSubmit = new EventEmitter<CategoryRequest>();
  @Output() formCancel = new EventEmitter<void>();

  categoryForm!: FormGroup;
  color: string = '#c4a347';
  isEditing: boolean = false;

  constructor(private fb: FormBuilder) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['editingCategory'] && this.editingCategory) {
      this.isEditing = true;
      this.initForm();

      //Ładuje do formularza dane jeżeli obiekt pasuje
      this.categoryForm.patchValue({
        name: this.editingCategory.name,
        parentId: this.editingCategory.parentId || '',
      });
      if (this.editingCategory.hexColor) {
        this.color = this.editingCategory.hexColor;
      }

      //Jeżeli wydatek ma jakieś podkategorie to blokuje formularz dla zmiany tego.
      if (this.editingCategory.subCategories && this.editingCategory.subCategories.length > 0) {
        this.categoryForm.get('parentId')?.disable();
      } else {
        this.categoryForm.get('parentId')?.enable();
      }

    } else if (changes['editingCategory'] && !this.editingCategory) {
      this.initForm();
      this.isEditing = false;
      this.resetForm();
    }
  }


  initForm(): void {
    this.categoryForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      parentId: [''],
    });
  }

  resetForm(): void {
    if (this.categoryForm != undefined) {
      this.categoryForm.reset();
    }
    this.color = '#c4a347';
  }

  onSubmit(): void {
    if (this.categoryForm.valid) {
      const formValue = this.categoryForm.value;
      const category: CategoryRequest = {
        name: formValue.name,
        parentId: formValue.parentId || undefined,
        categoryType: this.type
      };

      if (this.type === CategoryType.EXPENSE) {
        category.hexColor = this.color;
      }

      this.formSubmit.emit(category);
      if (!this.isEditing) {
        this.resetForm();
      }
    }
  }

  onCancel(): void {
    this.resetForm();
    this.formCancel.emit();
  }

  onBackdropClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (target.classList.contains('modal')) {
      this.closeModal();
    }
  }

  closeModal(): void {
    this.formCancel.emit();
  }
}
