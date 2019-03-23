import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthenticationService } from './service/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthenticationService,
    private router: Router
  ) {
    this.initializeApp();
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
          this.router.navigate(['/tabs/tabs/matches']);
        } else {
          this.router.navigate(['/login']);
        }
      })
    });
  }
}
