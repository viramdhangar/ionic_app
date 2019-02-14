import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { throwError, Observable, Subject, asapScheduler, pipe, of, from, interval, merge, fromEvent, SubscriptionLike, PartialObserver } from 'rxjs';
import { map, filter, scan, catchError } from 'rxjs/operators';
import { AlertValidatorService } from '../../service/alert-validator.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class VerificationService {

  public API = environment.host;
  public LEAGUES_API = this.API + '/verification';

  constructor(private http: HttpClient, private alert: AlertValidatorService, private router: Router) { }
}
