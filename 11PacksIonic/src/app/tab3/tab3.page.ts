import { Component } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';
import { Storage } from '@ionic/storage';
import { User } from '../../model/user';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  user: any;
  userName: any;

  constructor(private authSevice: AuthenticationService, private storage: Storage) {
    this.getCurrentUser();
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
}
