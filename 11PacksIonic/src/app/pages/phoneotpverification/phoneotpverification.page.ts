import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertValidatorService } from '../../service/alert-validator.service';
import { VerificationService } from '../verification/verification.service';
import { ToastController } from '@ionic/angular';
import { RegistrationService } from '../register/registration.service';

@Component({
  selector: 'app-phoneotpverification',
  templateUrl: './phoneotpverification.page.html',
  styleUrls: ['./phoneotpverification.page.scss'],
})
export class PhoneotpverificationPage implements OnInit {

  public user: User;
  regex: any;
  successMsg: any;
  verificationId: string = "";
  smsOTP: any;
  uniqueNumber: any;

  constructor(private toastController: ToastController, private verificationService: VerificationService, private registrationService: RegistrationService, private alert: AlertValidatorService, private route: ActivatedRoute, private router: Router) {
    this.user = new User();
  }

  ngOnInit() {
    this.uniqueNumber = +this.route.snapshot.paramMap.get('uniqueNumber');
  }

  verifyMobileOTP(user: any) {
    if (user.otp == 'undefined') {
      this.toastError("Please enter OTP");
    } else {
      this.verificationService.verifyMobileOTP(this.uniqueNumber, user.otp);
    }
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
