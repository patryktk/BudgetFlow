/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { ExpenseResponseForStatistics } from '../../models/expense-response-for-statistics';

export interface GetExpenseById$Params {
}

export function getExpenseById(http: HttpClient, rootUrl: string, params?: GetExpenseById$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<ExpenseResponseForStatistics>>> {
  const rb = new RequestBuilder(rootUrl, getExpenseById.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<ExpenseResponseForStatistics>>;
    })
  );
}

getExpenseById.PATH = '/expenses/statistics';
