import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { throwError, Observable, Subject, asapScheduler, pipe, of, from, interval, merge, fromEvent, SubscriptionLike, PartialObserver } from 'rxjs';
import { map, filter, scan, catchError } from 'rxjs/operators';
import { AlertValidatorService } from '../service/alert-validator.service';
import { Router } from '@angular/router';

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
export class LeaguesService {

  constructor(private http:HttpClient, private alert: AlertValidatorService, private router: Router) { }

  public API = environment.host;
  public LEAGUES_API = this.API + '/api/v1';
  respo: any;

  getLeagues(matchId : any): Observable<any> {
    return this.http.get(this.LEAGUES_API+'/leagues/'+matchId);
  }

  getLeague(leagueId : any): Observable<any> {
    return this.http.get(this.LEAGUES_API+'/league/'+leagueId);
  }

  joinLeague(team : any, leagueId: any, uniqueNumber: any, matchId: any) {
    return this.http.post(this.LEAGUES_API + '/joinLeague/'+leagueId, team, httpOptions).pipe(
      map((response: any) => {
        this.alert.validateAlert("League joined successfully");
        this.router.navigate(['/leagues', matchId]);
        return response;
      }),
      catchError((err: HttpErrorResponse) => {
        if (err.status == 200) {
          this.alert.validateAlert(err.error.text);
          this.router.navigate(['/leagues', matchId]);
          return err.error.message;
        }
        if ((err.status == 417) || (err.status == 404)) {
          this.alert.validateAlert(err.error.errorMessage);
          return throwError(err);
        } else {
          this.alert.validateAlert("Somthing is wrong...");
          console.log("status", err.status);
          return throwError(err);
        }
      })
    );
  }

  getJoinedLeagues(uniqueNumber: any, matchId: any) : Observable<any> {
    return this.http.get(this.LEAGUES_API+'/joinedLeagues/' + uniqueNumber + '/' + matchId);
  }

  switchTeam(team : any, leagueId: any, teamId: any) {
    console.log(this.http.post(this.LEAGUES_API + '/switchTeam/'+leagueId+'/'+teamId, team, httpOptions));
    return this.http.post(this.LEAGUES_API + '/switchTeam/'+leagueId+'/'+teamId, team, httpOptions);
  }
}
