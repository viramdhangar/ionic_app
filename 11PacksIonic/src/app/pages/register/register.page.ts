import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user';
import { RegistrationService } from './registration.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertValidatorService } from '../../service/alert-validator.service';
/*import * as firebase from 'firebase';*/

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
  code: string="";

  constructor(private registrationService: RegistrationService, private alert: AlertValidatorService, private route: ActivatedRoute, private router: Router) {
    this.user = new User();
   }

  ngOnInit() {
  }

  logForm(form : any){
    if(typeof form.uniqueNumber =='undefined'){
      this.alert.validateAlert("Mobile number can not empty");
      return false;
    } else if(typeof form.email =='undefined'){
      this.alert.validateAlert("email can not empty");
      return false;
    } else if(!this.isEmailValid(form.email)){
      this.alert.validateAlert("Please enter valid email");
      return false;
    } else if(typeof form.password =='undefined'){
      this.alert.validateAlert("password can not empty");
      return false;
    } else if(typeof form.firstName =='undefined'){
      this.alert.validateAlert("first name can not empty");
      return false;
    } else{
      this.registrationService.registration(form).subscribe(successMsg => {
        this.successMsg = successMsg;
        this.router.navigate(['/login']);
        console.log("mesage : "+this.successMsg.status);
      })
    }
  }

  isEmailValid(email: any) {
    this.regex = new RegExp(/[a-z0-9!#$%&'*+=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g);
    return this.regex.test(email);
  }

  /*send(){
    (<any>window).FirebasePlugin.verifyPhoneNumber("+918097547286", 60, (credential)=>{
      console.log(credential);
      this.verificationId = credential.verificationId;
    }, (error)=>{
      console.error(error);
    })
  }

  verify(){
    let signInCredential = firebase.auth.PhoneAuthProvider.credential(this.verificationId, this.code);
    firebase.auth().signInWithCredential(signInCredential).then((info)=>{
      console.log(info);
    }, (error)=>{
      console.log(error);
    });
  }*/
  sendEmailVerificationCode(email: any){

  }
}
