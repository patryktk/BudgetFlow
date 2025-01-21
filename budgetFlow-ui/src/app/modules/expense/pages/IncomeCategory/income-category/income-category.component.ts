import {Component, OnInit} from '@angular/core';
import {IncomeCategoryResponse} from "../../../../../services/models/income-category-response";
import {IncomeCategoryRequest} from "../../../../../services/models/income-category-request";
import {IncomeCategoryService} from "../../../../../services/services/income-category.service";

@Component({
  selector: 'app-income-category',
  templateUrl: './income-category.component.html',
  styleUrl: './income-category.component.scss'
})
export class IncomeCategoryComponent implements OnInit{

  categories: IncomeCategoryResponse[] = [];
  newCategory: IncomeCategoryRequest = {name: ''}

  constructor(private incomeCategoryService: IncomeCategoryService) {
  }

  ngOnInit(): void {
    this.getAllIncomeCategory();
  }

  getAllIncomeCategory() {
    this.incomeCategoryService.getAllIncomeCategories().subscribe({
      next: result => {
        this.categories = result;
      },
      error: err => {
        console.log("Error loading expenses list", err);
      }
    })
  }


  deleteCategory(id: number | undefined) {
    if (id !== undefined) {
      this.incomeCategoryService.deleteIncomeCategory({incomeCategoryId: id}).subscribe({
        next: result => {
          this.categories = this.categories.filter(category => category.id !== id);
        },
        error: err => {
          console.log("Error deleting expense");
        }
      })
    } else {
      console.log("Error deleting expense");
    }
  }

  addCategory() {
    this.incomeCategoryService.createIncomeCategory({
      body: this.newCategory
    }).subscribe({
      next: result => {
        this.categories.push(result);
      }
    })
  }
}
