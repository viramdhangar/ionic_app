import { Component } from '@angular/core';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(private socialSharing: SocialSharing, private actionSheetController: ActionSheetController) { }

  async refer() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Share with',
      buttons: [{
        text: 'Share',
        icon: 'share',
        handler: () => {
          console.log('Share clicked');
          this.socialSharing.share("faduplay", "", "https://us.123rf.com/450wm/vectorgalaxy/vectorgalaxy1805/vectorgalaxy180500376/101122345-stock-vector-cricket-logo-design-isolated-on-white-background-for-your-web-and-mobile-app-design-colorful-vector-.jpg?ver=6", "google.com");
        }
      }, {
        text: 'Facebook',
        icon: 'logo-facebook',
        handler: () => {
          console.log('Share clicked');
          this.socialSharing.shareViaFacebook("faduplay", "https://us.123rf.com/450wm/vectorgalaxy/vectorgalaxy1805/vectorgalaxy180500376/101122345-stock-vector-cricket-logo-design-isolated-on-white-background-for-your-web-and-mobile-app-design-colorful-vector-.jpg?ver=6", "google.com");
        }
      }, {
        text: 'Twitter',
        icon: 'logo-twitter',
        handler: () => {
          console.log('Share clicked');
          this.socialSharing.shareViaTwitter("faduplay", "https://us.123rf.com/450wm/vectorgalaxy/vectorgalaxy1805/vectorgalaxy180500376/101122345-stock-vector-cricket-logo-design-isolated-on-white-background-for-your-web-and-mobile-app-design-colorful-vector-.jpg?ver=6", "google.com");
        }
      }, {
        text: 'Whats App',
        icon: 'logo-whatsapp',
        handler: () => {
          console.log('Share clicked');
          this.socialSharing.shareViaWhatsApp("faduplay", "https://us.123rf.com/450wm/vectorgalaxy/vectorgalaxy1805/vectorgalaxy180500376/101122345-stock-vector-cricket-logo-design-isolated-on-white-background-for-your-web-and-mobile-app-design-colorful-vector-.jpg?ver=6", "google.com");
        }
      }, {
        text: 'Cancel',
        role: 'destructive'
      }]
    });
    await actionSheet.present();
  }
}
