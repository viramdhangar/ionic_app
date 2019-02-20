import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';

import { throwError, Observable, Subject, asapScheduler, pipe, of, from, interval, merge, fromEvent, SubscriptionLike, PartialObserver } from 'rxjs';
import { map, filter, scan, catchError } from 'rxjs/operators';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Methods': 'GET, PUT, POST',
    'Access-Control-Allow-Origin': '*'
  }
  )
};

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  public API = environment.host;
  public LEAGUES_API = this.API + '/api/v1';
  message: any;

  constructor(private http: HttpClient) { }

  getAccountInfo(userName: any) : Observable<any>{
    console.log("username", this.http.get(this.LEAGUES_API + '/account/'+userName));
    return this.http.get(this.LEAGUES_API + '/account/'+userName);
  }
  addBalance(account: any): Observable<any> {
    console.log("account service", account);
    console.log("account user service", account.username);
    return this.http.get(this.LEAGUES_API + '/addBalance/'+account.depositedAmount+'/'+account.username).pipe(
      map((message: any) => {
        this.message = message;
        console.log("User: ", this.message);
        
        return message;
      }),
      catchError((err: HttpErrorResponse) => {
        if (err.status == 200) {
          console.log("User: ", this.message);
          
          return this.message;
        }
        if ((err.status == 400) || (err.status == 404)) {
          
          console.log("status", err.status);
          return throwError(err);
        } else {
          
          console.log("status", err.status);
          return throwError(err);
        }
      })
    );
  }
}
