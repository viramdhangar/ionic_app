import { Component, OnInit } from '@angular/core';
import { SMS } from '@ionic-native/sms/ngx';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.page.html',
  styleUrls: ['./verification.page.scss'],
})
export class VerificationPage implements OnInit {

  smsOTP: any;

  constructor(private sms : SMS) { }

  ngOnInit() {
  }

  sendEmailVerificationCode(){
    this.sms.send('+917977743584', 'Hello world!').then((success) => {
      console.log("success: ", success);
    }).catch(err=>{
      console.log("err: ", err);
    })
  }
}
