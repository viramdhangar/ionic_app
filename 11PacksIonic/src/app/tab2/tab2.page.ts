import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JoinedteamsService } from '../service/joinedteams.service';
import { ImgName } from '../model/AppConstants';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  private matches: any;
  public EXTENTION = '.png';
  public IMG_PATH = '../../assets/images/bigbash/';
  matchess: any;
  uniqueNumber: any;
  user: any;

  constructor(private storage: Storage, private joinedteamsService: JoinedteamsService, private route: ActivatedRoute){
    this.matchess = "UPCOMING";
    this.uniqueNumber = "55555";
  }

  ngOnInit() {
    this.ionViewDidLoad();
  }

  ionViewDidLoad() {
    this.joinedteamsService.getJoinedMatches(this.uniqueNumber).subscribe(matches => {
      this.matches = matches;
      for(let joinedMatchObj of this.matches){
        for(let img of ImgName){
          if(joinedMatchObj.match.team1Name.includes(img)){
            joinedMatchObj.match.team1Url = this.IMG_PATH + img + this.EXTENTION;
          }
          if(joinedMatchObj.match.team2Name.includes(img)){
            joinedMatchObj.match.team2Url = this.IMG_PATH + img + this.EXTENTION;
          }
        }
        if(joinedMatchObj.match.team1Url == null){
          joinedMatchObj.match.team1Url = this.IMG_PATH + "default" + this.EXTENTION;
        }
        if(joinedMatchObj.match.team2Url == null){
          joinedMatchObj.match.team2Url = this.IMG_PATH + "default" + this.EXTENTION;
        }
        this.startTimer(joinedMatchObj.match);
      }
    })
  }
  getCurrentUser(){
    this.storage.get("user").then(res => {
      console.log(res);
      this.user = res;
      this.uniqueNumber = res.uniqueNumber;
      console.log(this.user);
    });
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
    if(this.futureDate.getTime() < this.currentDate.getTime()){
      match.liveFlag = true;
    }
  }
}
