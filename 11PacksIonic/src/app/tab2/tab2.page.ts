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
}
