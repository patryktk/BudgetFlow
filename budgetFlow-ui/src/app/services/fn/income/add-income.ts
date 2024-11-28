/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { IncomeRequest } from '../../models/income-request';
import { IncomeResponse } from '../../models/income-response';

export interface AddIncome$Params {
      body: IncomeRequest
}

export function addIncome(http: HttpClient, rootUrl: string, params: AddIncome$Params, context?: HttpContext): Observable<StrictHttpResponse<IncomeResponse>> {
  const rb = new RequestBuilder(rootUrl, addIncome.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<IncomeResponse>;
    })
  );
}

addIncome.PATH = '/expenses/income';
