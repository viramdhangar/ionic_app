import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IonicStorageModule } from '@ionic/storage';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { SMS } from '@ionic-native/sms/ngx';
import { StarplayerPageModule } from './pages/starplayer/starplayer.module';
import { WinningbreakupPageModule } from './pages/winningbreakup/winningbreakup.module';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import * as firebase from 'firebase';

firebase.initializeApp({
  apiKey: "AIzaSyBlfATRjXU3fA0Y9IFpMsyhUOhq1hNtbGs",
  authDomain: "riders-44f39.firebaseapp.com",
  databaseURL: "https://riders-44f39.firebaseio.com",
  projectId: "riders-44f39",
  storageBucket: "riders-44f39.appspot.com",
  messagingSenderId: "928518408139"
});

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, IonicStorageModule.forRoot(), StarplayerPageModule, WinningbreakupPageModule],
  providers: [
    StatusBar,
    SplashScreen,
    SocialSharing,
    SMS,
    InAppBrowser,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
