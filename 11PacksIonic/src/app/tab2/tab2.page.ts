import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JoinedteamsService } from '../service/joinedteams.service';
import { ImgName } from '../model/AppConstants';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  private matches: any;
  public EXTENTION = '.png';
  public IMG_PATH = '../../assets/images/bigbash/';
  matchess: any;
  username: any;

  constructor(private storage: Storage, private joinedteamsService: JoinedteamsService, private route: ActivatedRoute){
    this.matchess = "UPCOMING";
  }

  ngOnInit() {

    this.username = +this.route.snapshot.paramMap.get('username');
    console.log("username", this.username);
    this.ionViewDidLoad();
  }

  ionViewDidLoad() {
    this.joinedteamsService.getJoinedMatches(this.username).subscribe(matches => {
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
        this.startTimer(joinedMatchObj);
      }
    })
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
    this.futureDate = new Date(match.match.date);
    this.difference = this.futureDate.getTime() - this.currentDate.getTime();
    this.seconds = Math.floor(this.difference / 1000);
    this.minutes = Math.floor(this.seconds / 60);
    this.hours = Math.floor(this.minutes / 60);
    this.days = Math.floor(this.hours / 24);

    this.hours %= 24;
    this.minutes %= 60;
    this.seconds %= 60;

    match.match.days = this.days;
    match.match.hours = this.hours;
    match.match.minutes = this.minutes;
    match.match.seconds = this.seconds;
    if(this.futureDate.getTime() < this.currentDate.getTime()){
      match.match.liveFlag = true;
    }
  } 
}
