import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { User } from '../../model/user';
import { throwError, Observable, Subject, asapScheduler, pipe, of, from, interval, merge, fromEvent, SubscriptionLike, PartialObserver } from 'rxjs';
import { map, filter, scan, catchError } from 'rxjs/operators';
import { AlertValidatorService } from '../../service/alert-validator.service';

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
export class LoginService {

  constructor(private http: HttpClient, private alert: AlertValidatorService) { }

  public API = environment.host;
  public LEAGUES_API = this.API + '/identity';
  user: any;

  authenticate(user: User): Observable<any> {
    console.log(user.userName);
    return this.http.post(this.LEAGUES_API + '/login/', user, httpOptions).pipe(
      map((res: any) => {
        this.user = res;
        console.log("User: ", this.user);
        return res;
      }),
      catchError((err: HttpErrorResponse) => {
        if ((err.status == 400) || (err.status == 404)) {
          this.alert.validateAlert("Credientials not matching");
          console.log("status", err.status);
        } else {
          this.alert.validateAlert("Somthing is wrong...");
          return throwError(err);
        }
      })
    );
  }
}
