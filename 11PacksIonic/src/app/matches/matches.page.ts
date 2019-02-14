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
  public EXTENTION = '.png';
  public IMG_PATH = '../../assets/images/bigbash/';
    
  constructor(private authSevice: AuthenticationService, private  matchesService : MatchesService){ }

  ngOnInit() {
    this.ionViewDidLoad();
    }

  ionViewDidLoad() {
    this.matchesService.getMatches().subscribe(matches => {
      this.matches = matches;
      for(let match of this.matches){
        for(let img of ImgName){
          if(match.team1Name.includes(img)){
            match.team1Url = this.IMG_PATH + img + this.EXTENTION;
          }
          if(match.team2Name.includes(img)){
            match.team2Url = this.IMG_PATH + img + this.EXTENTION;
          }
        }
        if(match.team1Url == null){
          match.team1Url = this.IMG_PATH + "default" + this.EXTENTION;
        }
        if(match.team2Url == null){
          match.team2Url = this.IMG_PATH + "default" + this.EXTENTION;
        }
      }
    })
  }
  doRefresh(event) {
    
    this.matchesService.getMatches().subscribe(matches => {
      this.matches = matches;
      console.log('Begin async operation'+this.matches);
      for(let match of this.matches){
        for(let img of ImgName){
          if(match.team1Name.includes(img)){
            match.team1Url = this.IMG_PATH + img + this.EXTENTION;
          }
          if(match.team2Name.includes(img)){
            match.team2Url = this.IMG_PATH + img + this.EXTENTION;
          }
        }
        if(match.team1Url == null){
          match.team1Url = this.IMG_PATH + "default" + this.EXTENTION;
        }
        if(match.team2Url == null){
          match.team2Url = this.IMG_PATH + "default" + this.EXTENTION;
        }
      }
    })
    event.target.complete();
  }
  logout(){
    this.authSevice.logout();
  }
}
