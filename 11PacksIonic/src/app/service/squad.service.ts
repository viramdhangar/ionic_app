import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { MatchTeam } from '../model/matchteam';
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
export class SquadService {

  //public API = 'https://11packs.cfapps.io';
  public API = environment.host;
  public MATCHES_API = this.API + '/api/v1';
  matchTeam : MatchTeam;
  message: any;

  constructor(public http : HttpClient, private alert: AlertValidatorService, private router: Router) {}

  getSquad(matchId : any): Observable<any> {
    return this.http.get(this.MATCHES_API+'/squad/'+matchId);
  }

  createTeam(squad: any, matchId: any, uniqueNumber: any, teamId: any, action: any) {
    this.matchTeam = new MatchTeam();
    this.matchTeam.matchId = matchId;
    this.matchTeam.uniqueNumber = uniqueNumber;
    this.matchTeam.players = squad;
    if(action == 'EDIT'){
      this.matchTeam.id = teamId;
    }
    return this.http.post(this.MATCHES_API + '/createTeam/', this.matchTeam, httpOptions).pipe(
      map((message: any) => {
        this.message = message;
        this.alert.validateAlert("Team created successfully");
        this.router.navigate(['/teamsOfMatch', uniqueNumber, matchId, this.matchTeam]);
        return message;
      }),
      catchError((err: HttpErrorResponse) => {
        if (err.status == 200) {
          if(action == 'EDIT'){
            this.alert.validateAlert("Team updated successfully");
          }else{
            this.alert.validateAlert("Team created successfully");
          }
          this.router.navigate(['/teamsOfMatch', uniqueNumber, matchId, this.matchTeam]);
          return this.message;
        }
        if ((err.status == 400) || (err.status == 417)) {
          this.alert.validateAlert(err.error.errorMessage);
          console.log("status", err.status);
        } else {
          this.alert.validateAlert("Somthing is wrong...");
          console.log("status", err.status);
          return throwError(err);
        }
      })
    ).subscribe((message)=>{

    });
  }
  getSquadEditView(uniqueNumber: any, matchId: any, teamId: any) : Observable<any> {
    return this.http.get(this.MATCHES_API+'/teamEdit/'+uniqueNumber+'/'+matchId+'/'+teamId);
  }
}