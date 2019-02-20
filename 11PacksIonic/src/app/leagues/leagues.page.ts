import { Component, OnInit } from '@angular/core';
import { LeaguesService } from '../service/leagues.service';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { LoadingController } from '@ionic/angular'; 
import { MatchesService } from '../service/matches.service'

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

  constructor(private  matchesService : MatchesService, public loadingController: LoadingController, private storage: Storage, private leaguesService: LeaguesService, private route: ActivatedRoute) { 
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
      }
      loading.dismiss();
    })
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
      console.log("this.match", this.match);
    });
  }
}
