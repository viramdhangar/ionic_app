import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { throwError, Observable, Subject, asapScheduler, pipe, of, from, interval, merge, fromEvent, SubscriptionLike, PartialObserver } from 'rxjs';
import { map, filter, scan, catchError } from 'rxjs/operators';
import { ToastController, LoadingController } from '@ionic/angular';
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
export class SwitchteamService {

  response: any;

  constructor(private http:HttpClient, private toastController: ToastController, private router: Router, public loadingController: LoadingController) { }

  public API = environment.host;
  public LEAGUES_API = this.API + '/api/v1';

  async switchTeam(team: any, leagueId: any, teamId: any, matchStatus: any, uniqueNumber: any, matchId: any) {
    const loading = await this.loadingController.create({
      message: 'Switching...'
    });
    await loading.present();
    return this.http.post(this.LEAGUES_API + '/switchTeam/' + leagueId + '/' + teamId, team, httpOptions).pipe(
      map((response: any) => {
        this.response = response;
        if (matchStatus == 'JOINED') {
          this.router.navigate(['/joinedteams', uniqueNumber, matchId, leagueId, matchStatus, team]);
        } else if (matchStatus == 'UPCOMING') {
          this.router.navigate(['/joined-teamsrank', uniqueNumber, matchId, leagueId, matchStatus, team]);
        }
        loading.dismiss();
      }),
      catchError((err: HttpErrorResponse) => {
        if (err.status == 200) {
          if (matchStatus == 'JOINED') {
            this.router.navigate(['/joinedteams', uniqueNumber, matchId, leagueId, matchStatus, team]);
          } else if (matchStatus == 'UPCOMING') {
            this.router.navigate(['/joined-teamsrank', uniqueNumber, matchId, leagueId, matchStatus, team]);
          }
          this.toastAlert(err.error.text);
          loading.dismiss();

        } else if ((err.status == 400) || (err.status == 417)) {
          this.toastErrorAlert(err.error.errorMessage);
          loading.dismiss();
        } else {
          this.toastErrorAlert("Somthing is wrong...");
          loading.dismiss();
          return throwError(err);
        }
      })
    ).subscribe((message) => {
      loading.dismiss();
    });
  }

  async toastAlert(errorMessage: any) {
    const toast = await this.toastController.create({
      message: errorMessage,
      showCloseButton: true,
      color: 'success',
      position: 'top',
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
