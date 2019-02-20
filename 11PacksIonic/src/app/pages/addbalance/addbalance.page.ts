import { Component, OnInit } from '@angular/core';
import { AddbalanceService } from './addbalance.service';
import { Account } from '../../model/account';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { AlertValidatorService } from '../../service/alert-validator.service';
import { throwError, Observable, Subject, asapScheduler, pipe, of, from, interval, merge, fromEvent, SubscriptionLike, PartialObserver } from 'rxjs';
import { map, filter, scan, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { MatchesService } from '../../service/matches.service'

@Component({
  selector: 'app-addbalance',
  templateUrl: './addbalance.page.html',
  styleUrls: ['./addbalance.page.scss'],
})
export class AddbalancePage implements OnInit {


  account: Account;
  resAccount: any;
  user: any;

  constructor(private  matchesService : MatchesService, private storage: Storage, private addbalanceService: AddbalanceService, private alert: AlertValidatorService, private router: Router) {
    this.account = new Account();
  }

  ngOnInit() {
    this.getCurrentUser();
  }

  addBalance(account: any){
    console.log("amount", account);
    account.username = this.user.userName;
    this.addbalanceService.addBalance(account).subscribe(response => {
      this.resAccount = response;
      this.router.navigate(['/account', this.user.userName, this.resAccount]);
    })
  }

  getCurrentUser(){
    this.storage.get("user").then(res => {
      if(res){
        this.user = res;
      }
    })
  }
}
