import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user';
import { RegistrationService } from './registration.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertValidatorService } from '../../service/alert-validator.service';
import { VerificationService } from '../verification/verification.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  public user: User;
  regex: any;
  successMsg :any;
  verificationId:string ="";
  smsOTP: any;
  uniqueNumber: any;

  constructor(private toastController: ToastController, private verificationService: VerificationService, private registrationService: RegistrationService, private alert: AlertValidatorService, private route: ActivatedRoute, private router: Router) {
    this.user = new User();
   }

  ngOnInit() {
  }

  logForm(form : any){
    if(typeof form.uniqueNumber =='undefined'){
      this.toastError("Mobile number can not empty");
      return false;
    } else {
      this.uniqueNumber = form.uniqueNumber;
      this.verificationService.sendMobileOTP(form.uniqueNumber);
    }
  }

  verifyMobileOTP(user: any) {
    if (user.otp == 'undefined') {
      this.toastError("Please enter OTP");
    }
    this.verificationService.verifyMobileOTP(this.uniqueNumber, user.otp);
  }

  isEmailValid(email: any) {
    this.regex = new RegExp(/[a-z0-9!#$%&'*+=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g);
    return this.regex.test(email);
  }

  async toastError(errorMessage: any) {
    const toast = await this.toastController.create({
      message: errorMessage,
      showCloseButton: true,
      position: 'top',
      color: 'danger',
      closeButtonText: 'Done',
      duration: 2000
    });
    return await toast.present();
  }
}
