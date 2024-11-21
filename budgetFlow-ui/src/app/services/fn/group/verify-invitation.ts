/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { GroupInviteRequest } from '../../models/group-invite-request';

export interface VerifyInvitation$Params {
  token: string;
}

export function verifyInvitation(http: HttpClient, rootUrl: string, params: VerifyInvitation$Params, context?: HttpContext): Observable<StrictHttpResponse<GroupInviteRequest>> {
  const rb = new RequestBuilder(rootUrl, verifyInvitation.PATH, 'post');
  if (params) {
    rb.path('token', params.token, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<GroupInviteRequest>;
    })
  );
}

verifyInvitation.PATH = '/groups/verifyInvitation/{token}';
