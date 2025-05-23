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

import { checkIfUserExists } from '../fn/users/check-if-user-exists';
import { CheckIfUserExists$Params } from '../fn/users/check-if-user-exists';
import { getUserData } from '../fn/users/get-user-data';
import { GetUserData$Params } from '../fn/users/get-user-data';
import { getUsersData } from '../fn/users/get-users-data';
import { GetUsersData$Params } from '../fn/users/get-users-data';
import { UserResponse } from '../models/user-response';

@Injectable({ providedIn: 'root' })
export class UsersService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getUsersData()` */
  static readonly GetUsersDataPath = '/users/getUsersData';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getUsersData()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  getUsersData$Response(params: GetUsersData$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<UserResponse>>> {
    return getUsersData(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getUsersData$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  getUsersData(params: GetUsersData$Params, context?: HttpContext): Observable<Array<UserResponse>> {
    return this.getUsersData$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<UserResponse>>): Array<UserResponse> => r.body)
    );
  }

  /** Path part for operation `getUserData()` */
  static readonly GetUserDataPath = '/users/getUserData';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getUserData()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  getUserData$Response(params: GetUserData$Params, context?: HttpContext): Observable<StrictHttpResponse<UserResponse>> {
    return getUserData(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getUserData$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  getUserData(params: GetUserData$Params, context?: HttpContext): Observable<UserResponse> {
    return this.getUserData$Response(params, context).pipe(
      map((r: StrictHttpResponse<UserResponse>): UserResponse => r.body)
    );
  }

  /** Path part for operation `checkIfUserExists()` */
  static readonly CheckIfUserExistsPath = '/users/exist';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `checkIfUserExists()` instead.
   *
   * This method doesn't expect any request body.
   */
  checkIfUserExists$Response(params: CheckIfUserExists$Params, context?: HttpContext): Observable<StrictHttpResponse<boolean>> {
    return checkIfUserExists(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `checkIfUserExists$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  checkIfUserExists(params: CheckIfUserExists$Params, context?: HttpContext): Observable<boolean> {
    return this.checkIfUserExists$Response(params, context).pipe(
      map((r: StrictHttpResponse<boolean>): boolean => r.body)
    );
  }

}
