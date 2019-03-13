import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { throwError, Observable, Subject, asapScheduler, pipe, of, from, interval, merge, fromEvent, SubscriptionLike, PartialObserver } from 'rxjs';
import { map, filter, scan, catchError } from 'rxjs/operators';
import { AlertValidatorService } from '../service/alert-validator.service';
import { Router } from '@angular/router';
import { ToastController, LoadingController } from '@ionic/angular';

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

  constructor(private http:HttpClient, private alert: AlertValidatorService, private router: Router, private toastController: ToastController, private loadingController: LoadingController) { }

  public API = environment.host;
  public LEAGUES_API = this.API + '/api/v1';
  respo: any;

  getLeagues(matchId : any): Observable<any> {
    return this.http.get(this.LEAGUES_API+'/leagues/'+matchId);
  }

  getLeague(leagueId : any): Observable<any> {
    return this.http.get(this.LEAGUES_API+'/league/'+leagueId);
  }

  async joinLeague(team : any, leagueId: any, uniqueNumber: any, matchId: any) {
    const loading = await this.loadingController.create({
      message: "Joining..."
    });
    await loading.present();
    return this.http.post(this.LEAGUES_API + '/joinLeague/'+leagueId, team, httpOptions).pipe(
      map((response: any) => {
        loading.dismiss();
        this.toastAlert("League joined successfully");
        //this.alert.validateAlert("League joined successfully");
        this.router.navigate(['/leagues', matchId]);
        return response;
      }),
      catchError((err: HttpErrorResponse) => {
        if (err.status == 200) {
          loading.dismiss();
          this.toastAlert(err.error.text);
          //this.alert.validateAlert(err.error.text);
          this.router.navigate(['/leagues', matchId]);
          return err.error.message;
        }
        if ((err.status == 417) || (err.status == 404) || (err.status == 409)) {
          loading.dismiss();
          this.toastErrorAlert(err.error.errorMessage);
          //this.alert.validateAlert(err.error.errorMessage);
          return throwError(err);
        } else {
          loading.dismiss();
          this.toastErrorAlert(err.error.errorMessage);
          //this.alert.validateAlert("Somthing is wrong...");
          //console.log("status", err.status);
          return throwError(err);
        }
      })
    ).subscribe((message)=>{
      loading.dismiss();
    });
  }

  getJoinedLeagues(uniqueNumber: any, matchId: any) : Observable<any> {
    return this.http.get(this.LEAGUES_API+'/joinedLeagues/' + uniqueNumber + '/' + matchId);
  }

  switchTeam(team : any, leagueId: any, teamId: any) {
    return this.http.post(this.LEAGUES_API + '/switchTeam/'+leagueId+'/'+teamId, team, httpOptions);
  }

  getWinningBreakup(breakupId: number){
    return this.http.get(this.LEAGUES_API+'/winningBreakup/' + breakupId);
  }

  async toastAlert(errorMessage: any) {
    const toast = await this.toastController.create({
      message: errorMessage,
      showCloseButton: true,
      position: 'top',
      color: 'success',
      closeButtonText: 'Done',
      duration: 5000
    });
    return await toast.present();
  }

  async toastErrorAlert(errorMessage: any) {
    const toast = await this.toastController.create({
      message: errorMessage,
      showCloseButton: true,
      position: 'top',
      color: 'danger',
      closeButtonText: 'Done',
      duration: 5000
    });
    return await toast.present();
  }
}
