import { Component, OnInit } from '@angular/core';
import { TeamService } from '../service/team.service';
import { ActivatedRoute } from '@angular/router';
import { LeaguesService } from '../service/leagues.service';
import { AlertValidatorService } from '../service/alert-validator.service';
import { MatchesService } from '../service/matches.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { AccountService } from '../pages/account/account.service';
import { loadInternal } from '@angular/core/src/render3/util';

@Component({
  selector: 'app-teamlist',
  templateUrl: './teamlist.page.html',
  styleUrls: ['./teamlist.page.scss'],
})
export class TeamlistPage implements OnInit {

  teams : any = [];
  matchId : any;
  uniqueNumber : any;
  leagueId: any;
  league: any;
  team : any;
  successMsg: any;
  action: any;
  match: any;
  account: any;
  loading: any;

  constructor(private alertController: AlertController, private  matchesService : MatchesService, private teamService: TeamService, private leaguesService: LeaguesService, private route: ActivatedRoute, private alert: AlertValidatorService, private accountService: AccountService, private loadingController: LoadingController) { }

  ngOnInit() {
    this.uniqueNumber = +this.route.snapshot.paramMap.get('uniqueNumber');
    this.matchId = +this.route.snapshot.paramMap.get('matchId');
    this.leagueId = +this.route.snapshot.paramMap.get('leagueObj');
    this.action = +this.route.snapshot.paramMap.get('action');
    console.log("this.league", this.leagueId);
    this.getLeague();
    this.getMatch(this.matchId);
    this.getAccountInfo(this.uniqueNumber);
    this.ionViewDidLoad(this.uniqueNumber, this.matchId);
  }
  ionViewDidLoad(uniqueNumber : any , matchId : any) {
    this.teamService.getTeams( uniqueNumber, matchId).subscribe(teams => {
      this.teams = teams;
    })
  }

  updateRadio(teamObj : any){
    this.team = teamObj;
  }

  getLeague(){
    this.leaguesService.getLeague(this.leagueId).subscribe(response=>{
      this.league = response;
      console.log("league::: ",this.league);
    });
  }

  joinLeague(){
    console.log("league::: ",this.league);
    this.presentAlert();
  }

  getMatch(matchId: any){
    this.matchesService.getMatch(matchId).subscribe(match => {
      this.match = match;
      console.log("this.match", this.match);
    });
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Joining this Group ?',
      subHeader: '',
      message: 'Available balance - &#x20b9; '+this.account.amount+'<br/>Group joining fee  - &#x20b9; '+this.league.entryFee+'',
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
            if(this.account.amount >= this.league.entryFee){
              this.leaguesService.joinLeague(this.team, this.leagueId, this.uniqueNumber, this.matchId).subscribe(successMsg => {
                console.log("mesage : "+successMsg.toString);
                this.successMsg = successMsg.toString;
                this.alert.validateAlert("You have joined the league");
              })
            } else {
              this.alert.validateAlert("Please add balance to your wallet");
            }
          }
        }
      ]
    });
    return await alert.present();
  }

  getAccountInfo(userName: any) {
    this.accountService.getAccountInfo(userName).subscribe(response => {
      console.log("response:: ", response);
      this.account = response;
    });
  }

  async presentLoading(){
    const loading = await this.loadingController.create({
      message: "Joining..."
    });
    await loading.present();
    return loading;
  }
}
 