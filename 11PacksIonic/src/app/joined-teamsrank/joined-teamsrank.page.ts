import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JoinedteamsrankService } from '../service/joinedteamsrank.service';
import { LeaguesService } from '../service/leagues.service';
import { JoinedteamsService } from '../service/joinedteams.service';
import { MatchesService } from '../service/matches.service'
import { Storage } from '@ionic/storage';
import { ModalController } from '@ionic/angular';
import { WinningbreakupPage } from '../pages/winningbreakup/winningbreakup.page';

@Component({
  selector: 'app-joined-teamsrank',
  templateUrl: './joined-teamsrank.page.html',
  styleUrls: ['./joined-teamsrank.page.scss'],
})
export class JoinedTeamsrankPage implements OnInit {

  joinedTeams: any;
  leagues: any;
  league: any;
  leagueId : any ;
  action: any;
  matchId:any;
  uniqueNumber:number;
  matchStatus :string;
  match: any;
  user: any;

  constructor(private modalController: ModalController, private storage: Storage, private  matchesService : MatchesService, private joinedteamsService: JoinedteamsService, private joinedteamsrankService: JoinedteamsrankService, private leaguesService: LeaguesService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.matchId = +this.route.snapshot.paramMap.get('matchId');
    this.uniqueNumber = +this.route.snapshot.paramMap.get('uniqueNumber');
    this.leagueId = +this.route.snapshot.paramMap.get('leagueId');
    this.matchStatus = this.route.snapshot.params['matchStatus'];
    this.getCurrentUser();
    this.getMatch(this.matchId);
    this.getJoinedLeagues(this.uniqueNumber, this.matchId);
    this.ionViewDidLoad(this.uniqueNumber, this.matchId, this.leagueId);
    
  }

  ionViewDidLoad(uniqueNumber: any, matchId: any, leagueId: any) {
    this.joinedteamsrankService.getLeagueTeamsAndPoints(uniqueNumber, matchId, leagueId).subscribe(joinedTeams => {
      this.joinedTeams = joinedTeams;
      console.log("points:: "+this.joinedTeams);
      for(let team of this.joinedTeams){
        console.log(team);
      }
    })
  }
  getJoinedLeagues(uniqueNumber: any, matchId: any) {
    this.leaguesService.getJoinedLeagues(uniqueNumber, matchId).subscribe(leagues => {
      this.leagues = leagues;
      for (let league of this.leagues) {
        if (league.id == this.leagueId) {
          this.league = league;
          setInterval(() => {
            if (this.league.progress < (this.league.joinedTeam / this.league.size) * 100)
              this.league.progress += 1;
            else
              clearInterval(this.league.progress);
          }, 5);
        }
      }
    })
  }
  getAllTeams(matchId: any, leagueId: any){
    this.joinedteamsService.allJoinedTeamsInLeague(this.uniqueNumber, matchId, leagueId).subscribe(joinedTeams => {
      this.joinedTeams = joinedTeams;
      console.log("without points:: "+this.joinedTeams);
      for(let team of this.joinedTeams){
        team.teamRank = 1;
        team.points = 0;
      }
    })
  }
  doRefresh(event) {
    this.ionViewDidLoad(this.uniqueNumber, this.matchId, this.leagueId);
    event.target.complete();
  }

  getMatch(matchId: any){
    this.matchesService.getMatch(matchId).subscribe(match => {
      this.match = match;
      this.startTimer(this.match);
      console.log("this.match", this.match);
    });
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

  getCurrentUser(){
    this.storage.get("user").then(res => {
      if(res){
        this.user = res;
      }
    })
  }
  async presentModal(breakupId: any) {
    const modal = await this.modalController.create({
      component: WinningbreakupPage,
      componentProps: { value: breakupId }
    });
    return await modal.present();
  }
}
