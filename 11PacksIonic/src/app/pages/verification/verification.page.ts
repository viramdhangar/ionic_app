import { Component, OnInit } from '@angular/core';
import { SMS } from '@ionic-native/sms/ngx';
import { VerificationService } from './verification.service';
import { Storage } from '@ionic/storage';
import { User } from '../../model/user';
import { AuthenticationService } from '../../service/authentication.service';
import { ToastController } from '@ionic/angular';
import { FirebaseAuthentication } from '@ionic-native/firebase-authentication/ngx';
import { Firebase } from '@ionic-native/firebase/ngx';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.page.html',
  styleUrls: ['./verification.page.scss'],
})
export class VerificationPage implements OnInit {

  smsOTP: any;
  user: any;
  uniqueNumber: any;
  verificationId: any;

  constructor(private firebase: Firebase, private sms : SMS, private verification: VerificationService, private authSevice: AuthenticationService, private storage: Storage, private toastController: ToastController, private firebaseAuthentication: FirebaseAuthentication) { }

  ngOnInit() {
    this.getCurrentUser();
  }

  sendMobileOTP(){
    this.verification.sendMobileOTP(this.uniqueNumber);
  }

  verifyMobileOTP(){
    console.log("code", this.smsOTP)
    this.verification.verifyMobileOTP(this.uniqueNumber, this.smsOTP);
  }

  
  getCurrentUser() {
    this.storage.get("user").then(res => {
      console.log("res:: ", res);
      console.log("res:: ", res.uniqueNumber);
      this.uniqueNumber = res.uniqueNumber;
      this.user = res;
      if (res) {
        this.user = res;
      }
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
}
