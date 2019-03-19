import { Component, OnInit } from '@angular/core';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { ActionSheetController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-refer',
  templateUrl: './refer.page.html',
  styleUrls: ['./refer.page.scss'],
})
export class ReferPage implements OnInit {

  constructor(private socialSharing: SocialSharing, private actionSheetController: ActionSheetController, private storage: Storage) {
    this.getCurrentUser();
   }

  user: any;
  ngOnInit() {
  }

  async refer(referralCode:any) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Share with',
      buttons: [{
        text: 'Share',
        icon: 'share',
        handler: () => {
          console.log('Share clicked');
          this.socialSharing.share("Win real money!! play with Striker11, a fantasy game, use my referral code "+referralCode+" to get 50 Rs bonus to play.", "", "https://us.123rf.com/450wm/vectorgalaxy/vectorgalaxy1805/vectorgalaxy180500376/101122345-stock-vector-cricket-logo-design-isolated-on-white-background-for-your-web-and-mobile-app-design-colorful-vector-.jpg?ver=6", "www.striker11.com");
        }
      }, {
        text: 'Facebook',
        icon: 'logo-facebook',
        handler: () => {
          console.log('Share clicked');
          this.socialSharing.shareViaFacebook("Win real money!! play with Striker11, a fantasy game, use my referral code "+referralCode+" to get 50 Rs bonus to play.", "https://us.123rf.com/450wm/vectorgalaxy/vectorgalaxy1805/vectorgalaxy180500376/101122345-stock-vector-cricket-logo-design-isolated-on-white-background-for-your-web-and-mobile-app-design-colorful-vector-.jpg?ver=6", "www.striker11.com");
        }
      }, {
        text: 'Twitter',
        icon: 'logo-twitter',
        handler: () => {
          console.log('Share clicked');
          this.socialSharing.shareViaTwitter("Win real money!! play with Striker11, a fantasy game, use my referral code "+referralCode+" to get 50 Rs bonus to play.", "https://us.123rf.com/450wm/vectorgalaxy/vectorgalaxy1805/vectorgalaxy180500376/101122345-stock-vector-cricket-logo-design-isolated-on-white-background-for-your-web-and-mobile-app-design-colorful-vector-.jpg?ver=6", "www.striker11.com");
        }
      }, {
        text: 'Whats App',
        icon: 'logo-whatsapp',
        handler: () => {
          console.log('Share clicked');
          this.socialSharing.shareViaWhatsApp("Win real money!! play with Striker11, a fantasy game, use my referral code "+referralCode+" to get &#8377; 50 bonus to play.", "https://us.123rf.com/450wm/vectorgalaxy/vectorgalaxy1805/vectorgalaxy180500376/101122345-stock-vector-cricket-logo-design-isolated-on-white-background-for-your-web-and-mobile-app-design-colorful-vector-.jpg?ver=6", "www.striker11.com");
        }
      }, {
        text: 'Instagram',
        icon: 'logo-instagram',
        handler: () => {
          console.log('Share clicked');
          this.socialSharing.shareViaInstagram("Win real money!! play with Striker11, a fantasy game, use my referral code "+referralCode+" to get &#8377; 50 bonus to play.", "www.striker11.com");
        }
      }, {
        text: 'Cancel',
        role: 'destructive'
      }]
    });
    await actionSheet.present();
  }
  
  getCurrentUser(){
    this.storage.get("user").then(res => {
      console.log("res: ",res);
      if(res){
        this.user = res;
        console.log("this.user: ",this.user);
      }
    })
  }
}
