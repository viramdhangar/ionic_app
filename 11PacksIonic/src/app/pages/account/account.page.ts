import { Component, OnInit } from '@angular/core';
import { AccountService } from './account.service';
import { Storage } from '@ionic/storage';
import { User } from '../../model/user';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  amount: any;
  user: any;
  account: any;
  userName: any;

  constructor(private storage: Storage, private accountService: AccountService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.userName = +this.route.snapshot.paramMap.get('username');
    this.getAccountInfo(this.userName);
    
  }

  getAccountInfo(userName: any) {
    this.accountService.getAccountInfo(userName).subscribe(response => {
      console.log("response:: ", response);
      this.account = response;
    });
  }
}
