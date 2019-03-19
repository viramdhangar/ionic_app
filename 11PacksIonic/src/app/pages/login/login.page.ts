import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../model/user';
import { AlertValidatorService } from '../../service/alert-validator.service';
import { AuthenticationService } from '../../service/authentication.service';
import { LoadingController, ToastController } from '@ionic/angular'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  successMsg: any;
  public user: User;

  constructor(private toastController: ToastController, public loadingController: LoadingController, private authService: AuthenticationService, private loginService: LoginService, private route: ActivatedRoute, private router: Router, private alert: AlertValidatorService) {
    this.user = new User();
   }

  ngOnInit() {
  }

  ionViewDidLoad(){
    
  }

  async logForm(form : User){
    if(typeof form.userName =='undefined'){
      this.toastError5000("Username can not empty");
      return false;
    } else if(typeof form.password =='undefined'){
      this.toastError5000("Password can not empty");
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

  forgotPassword(){
    this.toastErrorAlert("Forgot password functionality under progress, for password change please write to us on striker11fantasy@gmail.com, will reset your password");
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
  async toastErrorAlert(errorMessage: any) {
    const toast = await this.toastController.create({
      message: errorMessage,
      showCloseButton: true,
      position: 'top',
      color: 'danger',
      closeButtonText: 'Done',
      duration: 20000
    });
    return await toast.present();
  }

  async toastError5000(errorMessage: any) {
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
