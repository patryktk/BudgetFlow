import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CategoryResponse} from "../../../../../services/models/category-response";
import {CategoryType} from "../../../../../services/utils/utils.service";

@Component({
  selector: 'app-category-list-main',
  standalone: false,
  templateUrl: './category-list-main.component.html',
  styleUrl: './category-list-main.component.scss'
})
export class CategoryListMainComponent {
  @Input() categories: CategoryResponse[] = [];
  @Input() activeUser: number = -1;
  @Input() type: CategoryType = CategoryType.EXPENSE;

  @Output() deleteCategory = new EventEmitter<number>();
  @Output() editCategory = new EventEmitter<CategoryResponse>();

  // Get only root categories (without parentId)
  getRootCategories(): CategoryResponse[] {
    return this.categories.filter(category => !category.parentId);
  }

  // Get subcategories for a given parent category
  getSubCategories(parentId: number | undefined): CategoryResponse[] {
    return this.categories.filter(category => category.parentId === parentId);
  }

  // Check if the user can modify a category
  canModify(category: CategoryResponse): boolean {
    return category.createdByUserId === this.activeUser;
  }

  onEdit(category: CategoryResponse): void {
    this.editCategory.emit(category);
  }

  onDelete(categoryId: number | undefined): void {
    if (categoryId !== undefined) {
      this.deleteCategory.emit(categoryId);
    }
  }
}
