import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthenticationService } from './service/authentication.service';
import { Router } from '@angular/router';
//import { AppVersion } from '@ionic-native/app-version/ngx';
import { AlertController } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { AppUpdateVersion } from './model/appupdateversion';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  latestAppVersion: any;
  applicationNumber: any;
  applicationUpdate: any;
  public versionNumber = AppUpdateVersion.versionNumber;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthenticationService,
    private router: Router,
   // private apppVersion: AppVersion,
    private alert: AlertController,
    private iab: InAppBrowser
  ) {
    this.initializeApp();
    /*this.apppVersion.getVersionNumber().then((version) =>{
      this.versionNumber = version;
    });*/
  }
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleBlackOpaque();
      // set status bar to white
      // this.statusBar.backgroundColorByHexString('#ffffff');
      this.splashScreen.hide();
      this.authService.authenticationState.subscribe(state => {
        console.log("auth changes the state: ", state);
        if (state) {
          this.appUpdateVersion();
          this.router.navigate(['/tabs/tabs/matches']);
        } else {
          this.router.navigate(['/login']);
        }
      })
    });
  }
  
 appUpdateVersion(){
  this.authService.latestAppVersion().subscribe((response)=>{
    this.applicationNumber = response.latestAppVersion;
    this.applicationUpdate = response.latestAppUpdate;
    if(response){
      this.alertToUpdate();
    }
  });
  }
  async alertToUpdate(){
    if(this.applicationNumber == this.versionNumber){
      //alert("You are on latest version");
    } else {
      if(this.applicationUpdate == "M"){
        const alert = await this.alert.create({
          header: 'App Update Notification !!',
          subHeader: '',
          message: 'Please update your app before proceed',
          backdropDismiss: false,
          buttons: [
            {
              text: 'Okay',
              handler: () => {
                const browser = this.iab.create('http://www.striker11.com/');
              }
            }
          ]
        });
        return await alert.present();
      }else{
        const alert = await this.alert.create({
          header: 'App Update Notification !!',
          subHeader: '',
          message: 'Please update your app before proceed',
          backdropDismiss: false,
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
              cssClass: 'secondary',
              handler: (blah) => {
                console.log('Confirm Cancel: blah');
              }
            }, {
              text: 'Okay',
              handler: () => {
                const browser = this.iab.create('http://www.striker11.com/');
              }
            }
          ]
        });
        return await alert.present();
      }
    }
  }
}
