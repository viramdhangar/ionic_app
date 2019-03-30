import { Component } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';
import { Storage } from '@ionic/storage';
import { User } from '../../model/user';
//import { AppVersion } from '@ionic-native/app-version/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { AlertController } from '@ionic/angular';
import { AppUpdateVersion } from '../model/appupdateversion';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  user: any;
  userName: any;
  appName: any;
  packageName: any;
  versionCode: any;
  appVersionDetail: any;
  showUpdate: boolean;
  applicationNumber: any;
  public versionNumber = AppUpdateVersion.versionNumber;
  public appVersionToShow = AppUpdateVersion.appVersionToShow;

  constructor(private authSevice: AuthenticationService, private storage: Storage, private iab: InAppBrowser, private alert: AlertController) {
    this.getLatestUppVersion();
    this.getCurrentUser();
    /*this.appVersion.getVersionNumber().then((version) =>{
      this.versionNumber = version;
    });*/    
   }
  
  logout(){
    this.authSevice.logout();
  }
  getCurrentUser() {
    this.storage.get("user").then(res => {
      console.log("res:: ", res);
      console.log("res:: ", res.userName);
      this.userName = res.userName;
      this.user = res;
      if (res) {
        this.user = res;
      }
    });
  }

  getLatestUppVersion(){
    this.authSevice.latestAppVersion().subscribe((response)=>{ 
      this.appVersionDetail = response;
      this.applicationNumber = response.latestAppVersion;
      if(response){
        this.isUpdateAvailable();
      }
    });
  }

  isUpdateAvailable(){
    if(this.applicationNumber == this.versionNumber){
      this.showUpdate = false;
    }else{
      this.showUpdate = true;
    }
  }
  
  async updateApp(){
    this.authSevice.latestAppVersion().subscribe((response)=>{
      this.appVersionDetail = response;
    });
    if(this.applicationNumber == this.versionNumber){
    } else{
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
