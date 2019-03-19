import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { throwError, Observable, Subject, asapScheduler, pipe, of, from, interval, merge, fromEvent, SubscriptionLike, PartialObserver } from 'rxjs';
import { map, filter, scan, catchError } from 'rxjs/operators';
import { AlertValidatorService } from '../../service/alert-validator.service';
import { Router } from '@angular/router';
import { OTPSystem } from './otpsystem';
import { LoadingController, ToastController } from '@ionic/angular';

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
export class VerificationService {

  public API = environment.host;
  public LEAGUES_API = this.API + '/verification';
  otpSystem: any;
  constructor(private toastController: ToastController, private loadingController: LoadingController, private http: HttpClient, private alert: AlertValidatorService, private router: Router) { }

  async sendMobileOTP(mobileNumber: any){
    const loading = await this.loadingController.create({
      message: "Sending OTP..."
    });
    await loading.present();
    return this.http.post(this.LEAGUES_API + '/sendMobileOTP/'+mobileNumber+'/otp', httpOptions).pipe(
      map((response: any) => {
        loading.dismiss();
        this.toastAlert("OTP sent successfully");
        return response;
      }),
      catchError((err: HttpErrorResponse) => {
        if (err.status == 200) {
          loading.dismiss();
          this.toastAlert(err.error.text);
          this.router.navigate(['/phoneotpverification', mobileNumber]);
          return err.error.text;
        }
        if ((err.status == 409)) {
          loading.dismiss();
          this.router.navigate(['/registerotherdetail', mobileNumber]);
          this.toastErrorAlert(err.error);
          return throwError(err);
        }
        if ((err.status == 417) || (err.status == 404)) {
          loading.dismiss();
          this.toastErrorAlert(err.error);
          return throwError(err);
        } else {
          loading.dismiss();
          this.toastErrorAlert(err.error);
          return throwError(err);
        }
      })
    ).subscribe((message)=>{
      loading.dismiss();
    });
  }

  async verifyMobileOTP(mobileNumber: any, otp: any){
    const loading = await this.loadingController.create({
      message: "Verifying OTP..."
    });
    await loading.present();
    this.otpSystem = new OTPSystem;
    this.otpSystem.otp=otp;
    console.log(this.otpSystem.otp);
    return this.http.post(this.LEAGUES_API + '/verifyMobileOTP/'+mobileNumber+'/otp', this.otpSystem, httpOptions).pipe(
      map((response: any) => {
        loading.dismiss();
        this.toastAlert("OTP verified successfully");
        return response;
      }),
      catchError((err: HttpErrorResponse) => {
        if (err.status == 200) {
          loading.dismiss();
          this.toastAlert(err.error.text);
          this.router.navigate(['/registerotherdetail', mobileNumber]);
          return err.error.text;
        }
        if ((err.status == 409)) {
          loading.dismiss();
          this.router.navigate(['/registerotherdetail', mobileNumber]);
          this.toastErrorAlert(err.error);
          return throwError(err);
        }
        if ((err.status == 400)) {
          loading.dismiss();
          this.router.navigate(['/login']);
          this.toastErrorAlert(err.error);
          return throwError(err);
        }
        if ((err.status == 417) || (err.status == 404)) {
          loading.dismiss();
          this.toastErrorAlert(err.error);
          return throwError(err);
        } else {
          loading.dismiss();
          this.toastErrorAlert(err.error);
          return throwError(err);
        }
      })
    ).subscribe((message)=>{
      loading.dismiss();
    });
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
