import {Injectable} from '@angular/core';
import {ExpenseResponse} from "../models/expense-response";
import {ExpenseRequest} from "../models/expense-request";
import {ExpenseCategoryRequest} from "../models/expense-category-request";
import {ExpenseCategoryResponse} from "../models/expense-category-response";

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() {
  }

  prepareRequestDatesActiveMonth() {
    const formatDate = (date: Date) => date.toISOString().split('T')[0];
    const starDate = new Date();
    starDate.setDate(1);
    const endDate = new Date(starDate);
    endDate.setMonth(starDate.getMonth() + 1);
    endDate.setDate(0);
    return {startDate: formatDate(starDate).toString(), endDate: formatDate(endDate).toString()};
  }

  formatDateFromISOToNormal(isoDate: string): string {
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Miesiące są indeksowane od 0
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
export enum CategoryType {
  EXPENSE = 'expense',
  INCOME = 'income'
}
