import { Component, OnInit } from '@angular/core';
import { MyjoinedleaguesService } from '../service/myjoinedleagues.service';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { WinningbreakupPage } from '../pages/winningbreakup/winningbreakup.page';
import { MatchesService } from '../service/matches.service'

@Component({
  selector: 'app-myjoinedleagues',
  templateUrl: './myjoinedleagues.page.html',
  styleUrls: ['./myjoinedleagues.page.scss'],
})
export class MyjoinedleaguesPage implements OnInit {

  leagues : Array<any>;
  matchId : any;
  matchStatus: any;
  uniqueNumber: any;
  match: any;

  constructor(private  matchesService : MatchesService, public modalController: ModalController, private myjoinedleaguesService: MyjoinedleaguesService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.matchId = +this.route.snapshot.paramMap.get('matchId');
    this.uniqueNumber = +this.route.snapshot.paramMap.get('uniqueNumber');
    this.matchStatus = this.route.snapshot.params['matchStatus'];
    /*this.route.params.subscribe( params =>
        this.matchStatus = params['matchStatus']
    )*/
    this.getMatch(this.matchId);
    this.ionViewDidLoad(this.uniqueNumber, this.matchId);
  }

  ionViewDidLoad(uniqueNumber: any, matchId: any) {
    this.myjoinedleaguesService.getJoinedLeagues(uniqueNumber, matchId).subscribe(leagues => {
      this.matchId = matchId;
      this.leagues = leagues;
      for(let league of this.leagues){
        setInterval(() => {
          if (league.progress < (league.joinedTeam/league.size)*100)
            league.progress += 1;
          else
            clearInterval(league.progress);
        }, 5);
      }
      console.log(this.leagues);
    })
  }

  async presentModal(breakupId: any) {
    const modal = await this.modalController.create({
      component: WinningbreakupPage,
      componentProps: { value: breakupId }
    });
    return await modal.present();
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
}
