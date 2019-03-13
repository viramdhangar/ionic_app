import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { throwError, Observable, Subject, asapScheduler, pipe, of, from, interval, merge, fromEvent, SubscriptionLike, PartialObserver } from 'rxjs';
import { map, filter, scan, catchError } from 'rxjs/operators';
import { AlertValidatorService } from '../../service/alert-validator.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

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
export class RegistrationService {

  message: any;

  constructor(private http: HttpClient, private alert: AlertValidatorService, private router: Router, private toastController: ToastController) { }

  public API = environment.host;
  public LEAGUES_API = this.API + '/identity';

  registration(user: any): Observable<any> {    
    return this.http.post(this.LEAGUES_API + '/registration/', user, httpOptions).pipe(
      map((message: any) => {
        this.message = message;
        console.log("User: ", this.message);
        this.toastAlert("Registration successfully");
        this.router.navigate(['/verification', user.email]);
        return message;
      }),
      catchError((err: HttpErrorResponse) => {
        if (err.status == 200) {
          console.log("User: ", this.message);
          this.toastAlert("Registration successfully");
          this.router.navigate(['/login']);
          return this.message;
        }
        if ((err.status == 400) || (err.status == 404)) {
          this.toastErrorAlert("Credientials not matching");
          console.log("status", err.status);
        } else {
          this.toastErrorAlert("Somthing is wrong...");
          console.log("status", err.status);
          return throwError(err);
        }
      })
    );
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
