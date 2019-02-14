import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../model/user';
import { AlertValidatorService } from '../../service/alert-validator.service';
import { AuthenticationService } from '../../service/authentication.service';
import { LoadingController } from '@ionic/angular'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  successMsg: any;
  public user: User;

  constructor(public loadingController: LoadingController, private authService: AuthenticationService, private loginService: LoginService, private route: ActivatedRoute, private router: Router, private alert: AlertValidatorService) {
    this.user = new User();
   }

  ngOnInit() {
  }

  ionViewDidLoad(){
    
  }

  async logForm(form : User){
    if(typeof form.userName =='undefined'){
      this.alert.validateAlert("Username can not empty");
      return false;
    } else if(typeof form.password =='undefined'){
      this.alert.validateAlert("Password can not empty");
      return false;
    } else {
      const loading = await this.loadingController.create({
        message: 'Authentication...'
      });
      await loading.present();
      this.authService.login(form);
      loading.dismiss();
    }
  }
  login(form: User) {
    
    this.authService.login(form);
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Athenticating...',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();

    console.log('Loading dismissed!');
  }
}
