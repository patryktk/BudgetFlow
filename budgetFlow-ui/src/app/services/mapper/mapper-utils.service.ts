import { Injectable } from '@angular/core';
import {ExpenseResponse} from "../models/expense-response";
import {ExpenseRequest} from "../models/expense-request";
import {ExpenseCategoryResponse} from "../models/expense-category-response";
import {ExpenseCategoryRequest} from "../models/expense-category-request";
import {CategoryResponse} from "../models/category-response";
import {CategoryRequest} from "../models/category-request";

@Injectable({
  providedIn: 'root'
})
export class MapperUtilsService {

  constructor() { }

  mapFromExpenseResponseToExpenseRequest(expenseResponse: ExpenseResponse | undefined) {
    const mappedExpenseRequest: ExpenseRequest = {
      amount: expenseResponse?.amount,
      categoryRequest: this.mapFromExpenseCategoryResponseToExpenseCategoryRequest(expenseResponse?.categoryResponse),
      expenseDate: expenseResponse?.expenseDate,
      id: expenseResponse?.id,
      name: expenseResponse?.name,
      note: expenseResponse?.note
    }
    return mappedExpenseRequest;
  }

  mapFromExpenseCategoryResponseToExpenseCategoryRequest(response: CategoryResponse | undefined) {
    const mappedCategoryRequest: CategoryRequest = {
      hexColor: response?.hexColor,
      id: response?.id,
      name: response?.name,
      parentId: response?.parentId
    }
    return mappedCategoryRequest;
  }


}
