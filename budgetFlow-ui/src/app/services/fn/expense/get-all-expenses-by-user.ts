/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { ExpenseResponse } from '../../models/expense-response';

export interface GetAllExpensesByUser$Params {
}

export function getAllExpensesByUser(http: HttpClient, rootUrl: string, params?: GetAllExpensesByUser$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<ExpenseResponse>>> {
  const rb = new RequestBuilder(rootUrl, getAllExpensesByUser.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<ExpenseResponse>>;
    })
  );
}

getAllExpensesByUser.PATH = '/expenses';
