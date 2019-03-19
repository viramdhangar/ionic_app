import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertValidatorService } from '../../service/alert-validator.service';
import { RegistrationService } from '../register/registration.service';
/*import * as firebase from 'firebase';*/

@Component({
  selector: 'app-register',
  templateUrl: './registerotherdetail.page.html',
  styleUrls: ['./registerotherdetail.page.scss'],
})
export class RegisterotherdetailPage implements OnInit {

  public user: User;
  regex: any;
  successMsg :any;
  verificationId:string ="";
  code: string="";
  uniqueNumber: any;

  constructor(private registrationService: RegistrationService, private alert: AlertValidatorService, private route: ActivatedRoute, private router: Router) {
    this.user = new User();
   }

  ngOnInit() {
    this.uniqueNumber = +this.route.snapshot.paramMap.get('uniqueNumber');
  }

  logForm(form : any){
    form.uniqueNumber = this.uniqueNumber;
    if(typeof form.email =='undefined'){
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
}