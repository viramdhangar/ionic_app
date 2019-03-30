import { Component } from '@angular/core';
import Instamojo from 'instamojo-nodejs';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { HTTP } from '@ionic-native/http/ngx';
import { Account } from 'src/app/model/account';
import { AddbalanceService } from 'src/app/pages/addbalance/addbalance.service';
import { User } from 'src/app/model/user';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
//import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
//import 'rxjs/add/operator/map';

@Component({
  selector: 'page-new-transaction',
  templateUrl: 'new_transaction.html',
  styleUrls: ['./new_transaction.scss'],
})
export class NewTransactionPage {
  amount: any;
  instamojoClient: any;
  depositedAmount: any;
  promotion: any;
  account: any;
  user: User;
  resAccount: any;
  processing: any;

  constructor(private iab: InAppBrowser, private http: HTTP, private addbalanceService: AddbalanceService, private storage: Storage, private router: Router, private toastController: ToastController) {
    this.getCurrentUser();
    this.instamojoClient = new Instamojo(http, iab, 'https://11packs.cfapps.io/paytm/access/token');
  }

  payNow() {
    var data = this.instamojoClient.getPaymentFields();
    data.purpose = "Striker11";            // REQUIRED
    data.amount = this.depositedAmount;                  // REQUIRED
    this.processing = "Processing please wait...";
    // do not change this
    data.redirect_url = "http://localhost";
    this.instamojoClient.payNow(data).then(response => {
      console.log(response);
      this.account = new Account();
      this.account.username = this.user.userName;
      this.account.depositedAmount = this.depositedAmount;
      this.account.promotion = this.promotion;
      this.addbalanceService.addBalance(this.account).subscribe(response => {
        if(response){
          this.resAccount = response;
          this.toastAlert("Payment added successfully");
          this.router.navigate(['/account', this.user.userName, this.resAccount]);
        }
      });
    }).catch(err => {
      this.toastErrorAlert("Payment failed: " + JSON.stringify(err));
      console.log("Payment failedd", JSON.stringify(err));
      throw err;
    });
    //call the Safari View Controller

    // end of safari view controller


  }
  getCurrentUser() {
    this.storage.get("user").then(res => {
      if (res) {
        this.user = res;
      }
    })
  }

  async toastAlert(errorMessage: any) {
    const toast = await this.toastController.create({
      message: errorMessage,
      showCloseButton: true,
      position: 'top',
      color: 'success',
      closeButtonText: 'Done',
      duration: 3000
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
      duration: 3000
    });
    return await toast.present();
  }
}
