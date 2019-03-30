import { Component, OnInit, enableProdMode } from '@angular/core';
//import { NewTransactionPage } from '../instamojo/new_transaction';
import { AddbalanceService } from './addbalance.service';
import { Account } from '../../model/account';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { AlertValidatorService } from '../../service/alert-validator.service';
import { throwError, Observable, Subject, asapScheduler, pipe, of, from, interval, merge, fromEvent, SubscriptionLike, PartialObserver } from 'rxjs';
import { map, filter, scan, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { MatchesService } from '../../service/matches.service';
import { TxnRequest } from '../../model/paytm';
import { User } from '../../model/user';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import * as sha512 from 'js-sha512';
import { ToastController, NavController } from '@ionic/angular';
import { PayPal, PayPalPayment, PayPalConfiguration, PayPalPaymentDetails } from '@ionic-native/paypal/ngx';

@Component({
  selector: 'app-addbalance',
  templateUrl: './addbalance.page.html',
  styleUrls: ['./addbalance.page.scss'],
})
export class AddbalancePage implements OnInit {

  txnRequest: TxnRequest;
  txnRequestToPaytm: TxnRequest;
  account: Account;
  resAccount: any;
  user: User;

  constructor(private navCtrl: NavController, private payPal: PayPal, private toast: ToastController , private iab: InAppBrowser, private matchesService: MatchesService, private storage: Storage, private addbalanceService: AddbalanceService, private alert: AlertValidatorService, private router: Router) {
    this.account = new Account();
  }

  ngOnInit() {
    this.getCurrentUser();
  }

  /*newTransaction() {
    this.navCtrl.push(NewTransactionPage, {
      amount: 10
    });
  }*/
  addBalance(account: any) {
    console.log("amount", account);
    account.username = this.user.userName;
    this.addbalanceService.addBalance(account).subscribe(response => {
      if(response){
        this.resAccount = response;
        this.router.navigate(['/account', this.user.userName, this.resAccount]);
      }
    });
  }

  createTxnRequest(account: any) {
    
    console.log("user", this.user);
    this.addbalanceService.getCheckSumHashAndOtherTxnRequest(account, this.user).subscribe((res)=>{
      console.log("response from server", res);
      
      if (!(<any>window).cordova) {
        // Cordova Not Present
        console.log("No cordova is not present");
        return;
    } else {  
        // Proceed Forword
        console.log("Yes cordova is present");
 
        const txnRequestPaytm = new TxnRequest();
        txnRequestPaytm.MID=res.MID;
        txnRequestPaytm.ORDER_ID= res.ORDER_ID;
        txnRequestPaytm.CUST_ID= res.CUST_ID;
        txnRequestPaytm.INDUSTRY_TYPE_ID = res.INDUSTRY_TYPE_ID;
        txnRequestPaytm.CHANNEL_ID = res.CHANNEL_ID;
        txnRequestPaytm.TXN_AMOUNT= res.TXN_AMOUNT;
        txnRequestPaytm.WEBSITE= res.WEBSITE;
        txnRequestPaytm.CALLBACK_URL = res.CALLBACK_URL;
        txnRequestPaytm.CHECKSUMHASH= res.CHECKSUMHASH;
        txnRequestPaytm.MOBILE_NO= res.MOBILE_NO;
        txnRequestPaytm.ENVIRONMENT= res.ENVIRONMENT;

        console.log("this.txnRequestToPaytm", txnRequestPaytm);

        enableProdMode();
        
        (<any>window).paytm.startPayment(
          txnRequestPaytm,
          this.successCallback,
          this.failureCallback
        );

    }
    });
  }

  successCallback = (response) => {
    console.log("Status: -", response.STATUS);
    if (response.STATUS == "TXN_SUCCESS") {
      // Verify Transaction Status and Amount.
      // Proceed further...
      // Refer PayTM Gateway Docs for Response Attributes/Properties
      console.log("Transaction Failed for reasonmmm: -", response);
    } else {
      // response.RESPCODE will be the error code.

      console.log("Transaction Failed for reason: -", response);

      // Handle Error...
    }
  }
  failureCallback = (error) => {
    // response.RESPCODE will be the error code.
    console.log("Transaction Failed for reason fauiluar: -", error);
    // Handle Error...
  }

  getCurrentUser() {
    this.storage.get("user").then(res => {
      if (res) {
        this.user = res;
      }
    })
  }

  makePayment(){
    let firstname="customer";
    let phone="8097547286";
    let email="";
    let txnid= String(Math.floor(Math.random() * (99 - 10 + 1) + 10)) + String(1235);
    let productinfo="product testing";
    let salt="DU5qyFyBDD";
    let key="QBzWX7uM";
    let amount="10";
    let surl="http://jslindia.org/Json/successPayumoneyPayment";
    let furl="http://jslindia.org/Json/failedPayumoney";
    let service_provider="payu_paisa";
    let udf1="";
    let udf2=txnid;
    let udf3="";
    let udf4="";
    let udf5="";
    let udf6="";
    let udf7="";
    let udf8="";
    let udf9="";
    let udf10="";

    let string = key + '|' + txnid + '|' + amount + '|' + productinfo + '|' + firstname + '|' + email + '|' + udf1 + '|' + udf2 + '|' + udf3 + '|' + udf4 + '|' + udf5 + '|' + udf6 + '|' + udf7 + '|' + udf8 + '|' + udf9 + '|' + udf10 + '|' + salt;
    let encrypttext = sha512.sha512(string);
    //https://secure.payu.in/_payment
    //https://sandboxsecure.payu.in/_payment
    let url = "https://sandboxsecure.payu.in/_payment?amount=" + amount +"&service_provider=" + service_provider +"&firstname=" + firstname +"&surl=" + surl +"&furl=" + furl +"&phone=" + phone +"&email=" + email +"&txnid=" + txnid +"&udf2=" + txnid +"&productinfo=" + productinfo +"&hash=" + encrypttext +"&salt=" + salt +"&key=" + key;

    let options: InAppBrowserOptions = {
      location: 'yes',
      clearcache: 'yes',
      zoom: 'yes',
      toolbar: 'no',
      closebuttoncaption: 'back'
    };

    const browser: any = this.iab.create(url, '_bank', options);

    browser.on('loadstart').subscribe(event => {
      //browser.executeScript({
        //file: "payumoney/payumoneyPaymentGateway.js"
      //});
      if(event.url == surl){
        this.toastAlert("Payment done successfully");
        browser.close();
      }
      if(event.url == furl){
        console.log("failed", event);
        this.toastAlert("Payment failed");
        browser.close();
      }
    })
  }

  async toastAlert(errorMessage: any) {
    const toast = await this.toast.create({
      message: errorMessage,
      showCloseButton: true,
      position: 'top',
      color: 'success',
      closeButtonText: 'Done',
      duration: 2000
    });
    return await toast.present();
  }
  
  payWithPayPal(){
    this.payPal.init({
      PayPalEnvironmentProduction: '',
      PayPalEnvironmentSandbox: 'AQdVzrxTl3Qlar4z3BROVdKJXNh5rHnvpZt_AzQAS3Uzy1RA2jVZU62NaWSEh-vIoW7K1_bIb0pLAJ4u'
    }).then(() =>{
      this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
        acceptCreditCards: false,
        languageOrLocale: 'en',
        merchantName: 'Viram Lal Dhangar',
        merchantPrivacyPolicyURL: '',
        merchantUserAgreementURL: ''
      })).then(() =>{
        let detail = new PayPalPaymentDetails('10.00', '0.00', '0.00');
        let payment  = new PayPalPayment('10.00', 'INR', 'Description', 'sale', detail);
        this.payPal.renderSinglePaymentUI(payment).then((response) =>{
          console.log("paypal payment...");
        }, () => {
          console.log("error rendering...");
        })
      })

    })
  }
  
  payWithInstamojo(){
    this.router.navigate(['/newTransaction']);
  }
}
