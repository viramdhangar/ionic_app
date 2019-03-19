import { Component, OnInit } from '@angular/core';
import { LeaguesService } from '../service/leagues.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { LoadingController } from '@ionic/angular'; 
import { MatchesService } from '../service/matches.service'
import { ModalController, ToastController } from '@ionic/angular';
import { WinningbreakupPage } from '../pages/winningbreakup/winningbreakup.page';
import { TeamService } from '../service/team.service';

@Component({
  selector: 'app-leagues',
  templateUrl: './leagues.page.html',
  styleUrls: ['./leagues.page.scss'],
})
export class LeaguesPage implements OnInit {

  leagues : Array<any>;
  matchId : any;
  joinedLeague: any;
  leaguess: any;
  matchStatus: any;
  uniqueNumber:any;
  user: any;
  match: any;
  loadTillThen: number = 0;
  progress: number = 0;
  teams: any;

  constructor(public modalController: ModalController, private  matchesService : MatchesService, public loadingController: LoadingController, private storage: Storage, private leaguesService: LeaguesService, private route: ActivatedRoute, private teamService: TeamService, private router : Router, private toastController: ToastController) { 
    this.leaguess = "ALL";
  }

  ngOnInit() {
    this.matchId = +this.route.snapshot.paramMap.get('id');
    this.uniqueNumber = +this.route.snapshot.paramMap.get('uniqueNumber');
    this.joinedLeague = this.route.snapshot.params['joinedLeague'];
    //this.route.params.subscribe( params =>
    // this.match = params['match']
   // )
    console.log(this.match);
    this.getCurrentUser();
    this.getMatch(this.matchId);
    if (this.joinedLeague == "JOINED") {
      this.getJoinedLeagues(this.uniqueNumber, this.matchId);
    } else {
      this.joinedLeague = "JOIN";
      this.ionViewDidLoad(this.matchId);
    }
    /*this.route.params.subscribe( params =>
        this.matchStatus = params['matchStatus']
    )*/
  }

  async ionViewDidLoad(matchId : any) {
    const loading = await this.loadingController.create({
      message: 'Loading...'
    });
    await loading.present();
    this.leaguesService.getLeagues(matchId).subscribe(leagues => {
      this.matchId = matchId;
      this.leagues = leagues;
      for(let league of this.leagues){
        league.status = "ALL";
        setInterval(() => {
          if (league.progress < (league.joinedTeam/league.size)*100)
            league.progress += 1;
          else
            clearInterval(league.progress);
        }, 5);
      }
      loading.dismiss();
    })
  }
  
  
  setProgressBar(league: any) {

  }
  async getJoinedLeagues(uniqueNumber: any, matchId: any) {
    const loading = await this.loadingController.create({
      message: 'Loading...'
    });
    await loading.present();
    this.leaguesService.getJoinedLeagues(uniqueNumber, matchId).subscribe(leagues => {
      this.matchId = matchId;
      this.leagues = leagues;
      for(let league of this.leagues){
        league.status = "ALL";
        setInterval(() => {
          if (league.progress < (league.joinedTeam/league.size)*100)
            league.progress += 1;
          else
            clearInterval(league.progress);
        }, 5);
      }
      console.log(this.leagues);
      loading.dismiss();
    })
  }
  getCurrentUser(){
    this.storage.get("user").then(res => {
      if(res){
        this.user = res;
        this.uniqueNumber = this.user.uniqueNumber;
      }
    })
  }
  getMatch(matchId: any){
    this.matchesService.getMatch(matchId).subscribe(match => {
      this.match = match;
      this.startTimer(this.match);
      console.log("this.match", this.match);
    });
  }
  doRefresh(event) {
    this.ionViewDidLoad(this.matchId);
    event.target.complete();
  }

  async presentModal(breakupId: any) {
    const modal = await this.modalController.create({
      component: WinningbreakupPage,
      componentProps: { value: breakupId }
    });
    return await modal.present();
  }

  currentDate: any;
  futureDate: any;
  difference: any;
  days: any;
  hours: any;
  minutes: any;
  seconds: any;
  calculateRemainingTime(match: any) {
    this.currentDate = new Date();
    this.futureDate = new Date(match.date);
    this.difference = this.futureDate.getTime() - this.currentDate.getTime();
    this.seconds = Math.floor(this.difference / 1000);
    this.minutes = Math.floor(this.seconds / 60);
    this.hours = Math.floor(this.minutes / 60);
    this.days = Math.floor(this.hours / 24);
 
    this.hours %= 24;
    this.minutes %= 60;
    this.seconds %= 60;
 
    match.days = this.days;
    match.hours = this.hours;
    match.minutes = this.minutes;
    match.seconds = this.seconds;
  }
  interval: any;
  startTimer(match: any) {
    this.interval = setInterval(() => {
      this.calculateRemainingTime(match);
    }, 1000)
  }

  joinTeam(leagueId: any){
    this.teamService.getTeams( this.uniqueNumber, this.matchId).subscribe(teams => {
      this.teams = teams;
      if(teams.length > 0){
        this.router.navigate(['/teamlist', this.uniqueNumber, this.matchId, leagueId, 2]);
      }else{
        this.router.navigate(['/teamsOfMatch', this.uniqueNumber, this.matchId]);
        this.toastErrorAlert("Create team to join the group");
      }
    })
  }

  async toastErrorAlert(errorMessage: any) {
    const toast = await this.toastController.create({
      message: errorMessage,
      showCloseButton: true,
      position: 'top',
      color: 'danger',
      closeButtonText: 'Done',
      duration: 5000
    });
    return await toast.present();
  }
}
