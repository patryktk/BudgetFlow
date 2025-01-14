/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { addExpense } from '../fn/expense/add-expense';
import { AddExpense$Params } from '../fn/expense/add-expense';
import { deleteExpense } from '../fn/expense/delete-expense';
import { DeleteExpense$Params } from '../fn/expense/delete-expense';
import { ExpenseCalendarFieldInfo } from '../models/expense-calendar-field-info';
import { ExpenseResponse } from '../models/expense-response';
import { ExpenseResponseForStatistics } from '../models/expense-response-for-statistics';
import { getAllExpenseByUserByMonth } from '../fn/expense/get-all-expense-by-user-by-month';
import { GetAllExpenseByUserByMonth$Params } from '../fn/expense/get-all-expense-by-user-by-month';
import { getAllExpensesByUser } from '../fn/expense/get-all-expenses-by-user';
import { GetAllExpensesByUser$Params } from '../fn/expense/get-all-expenses-by-user';
import { getAllExpenseStatistics } from '../fn/expense/get-all-expense-statistics';
import { GetAllExpenseStatistics$Params } from '../fn/expense/get-all-expense-statistics';
import { getExpensesToCalendarByCategory } from '../fn/expense/get-expenses-to-calendar-by-category';
import { GetExpensesToCalendarByCategory$Params } from '../fn/expense/get-expenses-to-calendar-by-category';
import { getStatisticsByMonth } from '../fn/expense/get-statistics-by-month';
import { GetStatisticsByMonth$Params } from '../fn/expense/get-statistics-by-month';
import { updateExpense } from '../fn/expense/update-expense';
import { UpdateExpense$Params } from '../fn/expense/update-expense';

@Injectable({ providedIn: 'root' })
export class ExpenseService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getAllExpensesByUser()` */
  static readonly GetAllExpensesByUserPath = '/expenses';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllExpensesByUser()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllExpensesByUser$Response(params?: GetAllExpensesByUser$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<ExpenseResponse>>> {
    return getAllExpensesByUser(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllExpensesByUser$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllExpensesByUser(params?: GetAllExpensesByUser$Params, context?: HttpContext): Observable<Array<ExpenseResponse>> {
    return this.getAllExpensesByUser$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<ExpenseResponse>>): Array<ExpenseResponse> => r.body)
    );
  }

  /** Path part for operation `updateExpense()` */
  static readonly UpdateExpensePath = '/expenses';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateExpense()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateExpense$Response(params: UpdateExpense$Params, context?: HttpContext): Observable<StrictHttpResponse<ExpenseResponse>> {
    return updateExpense(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateExpense$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateExpense(params: UpdateExpense$Params, context?: HttpContext): Observable<ExpenseResponse> {
    return this.updateExpense$Response(params, context).pipe(
      map((r: StrictHttpResponse<ExpenseResponse>): ExpenseResponse => r.body)
    );
  }

  /** Path part for operation `addExpense()` */
  static readonly AddExpensePath = '/expenses';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addExpense()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addExpense$Response(params: AddExpense$Params, context?: HttpContext): Observable<StrictHttpResponse<ExpenseResponse>> {
    return addExpense(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `addExpense$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addExpense(params: AddExpense$Params, context?: HttpContext): Observable<ExpenseResponse> {
    return this.addExpense$Response(params, context).pipe(
      map((r: StrictHttpResponse<ExpenseResponse>): ExpenseResponse => r.body)
    );
  }

  /** Path part for operation `deleteExpense()` */
  static readonly DeleteExpensePath = '/expenses';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteExpense()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteExpense$Response(params: DeleteExpense$Params, context?: HttpContext): Observable<StrictHttpResponse<boolean>> {
    return deleteExpense(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteExpense$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteExpense(params: DeleteExpense$Params, context?: HttpContext): Observable<boolean> {
    return this.deleteExpense$Response(params, context).pipe(
      map((r: StrictHttpResponse<boolean>): boolean => r.body)
    );
  }

  /** Path part for operation `getAllExpenseStatistics()` */
  static readonly GetAllExpenseStatisticsPath = '/expenses/statistics';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllExpenseStatistics()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllExpenseStatistics$Response(params?: GetAllExpenseStatistics$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<ExpenseResponseForStatistics>>> {
    return getAllExpenseStatistics(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllExpenseStatistics$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllExpenseStatistics(params?: GetAllExpenseStatistics$Params, context?: HttpContext): Observable<Array<ExpenseResponseForStatistics>> {
    return this.getAllExpenseStatistics$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<ExpenseResponseForStatistics>>): Array<ExpenseResponseForStatistics> => r.body)
    );
  }

  /** Path part for operation `getStatisticsByMonth()` */
  static readonly GetStatisticsByMonthPath = '/expenses/statistics';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getStatisticsByMonth()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  getStatisticsByMonth$Response(params: GetStatisticsByMonth$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<ExpenseResponseForStatistics>>> {
    return getStatisticsByMonth(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getStatisticsByMonth$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  getStatisticsByMonth(params: GetStatisticsByMonth$Params, context?: HttpContext): Observable<Array<ExpenseResponseForStatistics>> {
    return this.getStatisticsByMonth$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<ExpenseResponseForStatistics>>): Array<ExpenseResponseForStatistics> => r.body)
    );
  }

  /** Path part for operation `getAllExpenseByUserByMonth()` */
  static readonly GetAllExpenseByUserByMonthPath = '/expenses/expenseByMonth';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllExpenseByUserByMonth()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  getAllExpenseByUserByMonth$Response(params: GetAllExpenseByUserByMonth$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<ExpenseResponse>>> {
    return getAllExpenseByUserByMonth(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllExpenseByUserByMonth$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  getAllExpenseByUserByMonth(params: GetAllExpenseByUserByMonth$Params, context?: HttpContext): Observable<Array<ExpenseResponse>> {
    return this.getAllExpenseByUserByMonth$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<ExpenseResponse>>): Array<ExpenseResponse> => r.body)
    );
  }

  /** Path part for operation `getExpensesToCalendarByCategory()` */
  static readonly GetExpensesToCalendarByCategoryPath = '/expenses/expensesToCalendarByCategory';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getExpensesToCalendarByCategory()` instead.
   *
   * This method doesn't expect any request body.
   */
  getExpensesToCalendarByCategory$Response(params?: GetExpensesToCalendarByCategory$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<ExpenseCalendarFieldInfo>>> {
    return getExpensesToCalendarByCategory(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getExpensesToCalendarByCategory$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getExpensesToCalendarByCategory(params?: GetExpensesToCalendarByCategory$Params, context?: HttpContext): Observable<Array<ExpenseCalendarFieldInfo>> {
    return this.getExpensesToCalendarByCategory$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<ExpenseCalendarFieldInfo>>): Array<ExpenseCalendarFieldInfo> => r.body)
    );
  }

}
