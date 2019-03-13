import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tabs1',
  templateUrl: './tabs1.page.html',
  styleUrls: ['./tabs1.page.scss'],
})
export class Tabs1Page implements OnInit {

  user: any;
  uniqueNumber: any;

  constructor(private storage: Storage) {

    this.getCurrentUser();
  }

  ngOnInit() {
    this.ionViewDidLoad();
    console.log("tabs uniqueNumber", this.uniqueNumber);
  }
  ionViewDidLoad() {
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.storage.get("user").then(res => {
      console.log(res);
      this.user = res;
      this.uniqueNumber = res.uniqueNumber;
      console.log(this.user);
    });
  }

}
