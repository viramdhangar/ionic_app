import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';
import { LoginService } from '../pages/login/login.service';

const TOKEN_KEY='auth-token';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authenticationState = new BehaviorSubject(false);
  user: any;

  constructor(private storage: Storage, private platform: Platform, private loginService: LoginService) {
    this.platform.ready().then(() => {
      this.checkToken();
    })
   }

  login(user: any):any {
    this.loginService.authenticate(user).subscribe(user => {
      this.user = user;
      this.storage.set("user", user);
      console.log("user is there in authentication service: ", user.firstName);
      if(user){
        return this.storage.set(TOKEN_KEY, 'Bearer 123456').then(res => {
          this.authenticationState.next(true);
        })
      }
    });
  }

  logout(){
    this.storage.remove("user");
    return this.storage.remove(TOKEN_KEY).then(() => {
      this.authenticationState.next(false);
    })
  }
  
  isAuthenticated(){
    return this.authenticationState.value;
  }

  checkToken(){
    return this.storage.get(TOKEN_KEY).then(res => {
      if(res){
        this.authenticationState.next(true);
      }
    })
  }
  latestAppVersion(){
    return this.loginService.latestAppVersion();
  }
}
