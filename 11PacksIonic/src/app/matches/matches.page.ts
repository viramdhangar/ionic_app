import { Component } from '@angular/core';
import { MatchesService } from '../service/matches.service'
import { ImgName } from '../model/AppConstants';
import { Observable, of } from 'rxjs';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-Matches',
  templateUrl: 'Matches.page.html',
  styleUrls: ['Matches.page.scss']
})
export class MatchesPage {

  private matches: Array<any>;
  match: any;
  public EXTENTION = '.png';
  public IMG_PATH = '../../assets/images/bigbash/';

  constructor(private authSevice: AuthenticationService, private matchesService: MatchesService) { }

  ngOnInit() {
    this.ionViewDidLoad();
  }

  ionViewDidLoad() {
    this.matchesService.getMatches().subscribe(matches => {
      this.matches = matches;
      for (let match of this.matches) {
        for (let img of ImgName) {
          if (match.team1Name.includes(img)) {
            match.team1Url = this.IMG_PATH + img + this.EXTENTION;
          }
          if (match.team2Name.includes(img)) {
            match.team2Url = this.IMG_PATH + img + this.EXTENTION;
          }
        }
        if (match.team1Url == null) {
          match.team1Url = this.IMG_PATH + "default" + this.EXTENTION;
        }
        if (match.team2Url == null) {
          match.team2Url = this.IMG_PATH + "default" + this.EXTENTION;
        }
        this.startTimer(match);
      }
    })
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
  doRefresh(event) {
    this.ionViewDidLoad();
    event.target.complete();
  }
  interval: any;
  startTimer(match: any) {
    this.interval = setInterval(() => {
      this.calculateRemainingTime(match);
    }, 1000)
  }
  pauseTimer() {
    clearInterval(this.interval);
  }

}
