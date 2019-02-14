import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertValidatorService {

  constructor(private alertController: AlertController) { }

  async validateAlert(errorMessage: any) {
    const alert = await this.alertController.create({
      header: 'Opps....',
      subHeader: 'Your are going wrong',
      message: errorMessage,
      buttons: ['OK']
    });
    return await alert.present();
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Subtitle',
      message: 'This is an alert message.',
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
            console.log('Confirm Okay');
          }
        }
      ]
    });
    return await alert.present();
  }
}
