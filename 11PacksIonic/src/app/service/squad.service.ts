import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map, filter, scan, catchError } from 'rxjs/operators';
import { MatchTeam } from '../model/matchteam';
import { environment } from '../../environments/environment';
import { throwError, Observable, Subject, asapScheduler, pipe, of, from, interval, merge, fromEvent, SubscriptionLike, PartialObserver } from 'rxjs';
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
export class SquadService {

  //public API = 'https://11packs.cfapps.io';
  public API = environment.host;
  public MATCHES_API = this.API + '/api/v1';
  matchTeam : MatchTeam;
  message: any;

  constructor(public http : HttpClient, private alert: AlertValidatorService, private toastController: ToastController, private router: Router, public loadingController: LoadingController) {}

  getSquad(matchId : any): Observable<any> {
    return this.http.get(this.MATCHES_API+'/squad/'+matchId);
  }

  async createTeam(squad: any, matchId: any, uniqueNumber: any, teamId: any, action: any) {
    this.matchTeam = new MatchTeam();
    this.matchTeam.matchId = matchId;
    this.matchTeam.uniqueNumber = uniqueNumber;
    this.matchTeam.players = squad;
    if(action == 'EDIT'){
      this.matchTeam.id = teamId;
    }
    const loading = await this.loadingController.create({
      message: 'Loading...'
    });
    await loading.present();
    console.log("this.matchTeam :: ",this.matchTeam+action+teamId);
    return this.http.post(this.MATCHES_API + '/createTeam/', this.matchTeam, httpOptions).pipe(
      map((message: any) => {
        this.message = message;
        this.toastAlert("Team created successfully");
        this.router.navigate(['/teamsOfMatch', uniqueNumber, matchId, this.matchTeam]);
        loading.dismiss();
        return message;
      }),
      catchError((err: HttpErrorResponse) => {
        if (err.status == 200) {
          if(action == 'EDIT'){
            this.toastAlert("Team updated successfully");
          }else{
            this.toastAlert("Team created successfully");
          }
          this.router.navigate(['/teamsOfMatch', uniqueNumber, matchId, this.matchTeam]);
          loading.dismiss();
          return this.message;
        }
        if ((err.status == 400) || (err.status == 417)) {
          this.toastErrorAlert(err.error.errorMessage);
          loading.dismiss();
        } else {
          this.toastErrorAlert("Somthing is wrong...");
          loading.dismiss();
          return throwError(err);
        }
      })
    ).subscribe((message)=>{
      loading.dismiss();
    });
  }
  getSquadEditView(uniqueNumber: any, matchId: any, teamId: any) : Observable<any> {
    return this.http.get(this.MATCHES_API+'/teamEdit/'+uniqueNumber+'/'+matchId+'/'+teamId);
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