import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JoinedteamsService } from '../service/joinedteams.service';
import { LeaguesService } from '../service/leagues.service';

@Component({
  selector: 'app-joinedteams',
  templateUrl: './joinedteams.page.html',
  styleUrls: ['./joinedteams.page.scss'],
})
export class JoinedteamsPage implements OnInit {

  joinedTeams: any;
  leagues: any;
  league: any;
  leagueId : any ;
  action: any;
  matchId:any;
  uniqueNumber:number;
  matchStatus :string;

  constructor(private joinedteamsService: JoinedteamsService, private leaguesService: LeaguesService, private route: ActivatedRoute) {
    this.action = 1;
   }

  ngOnInit() {
    this.matchId = +this.route.snapshot.paramMap.get('matchId');
    this.uniqueNumber = +this.route.snapshot.paramMap.get('uniqueNumber');
    this.leagueId = +this.route.snapshot.paramMap.get('leagueId');
    this.matchStatus = this.route.snapshot.params['matchStatus'];
    this.getJoinedLeagues(this.uniqueNumber, this.matchId);
    this.ionViewDidLoad(this.uniqueNumber, this.matchId, this.leagueId);
    
  }

  ionViewDidLoad(uniqueNumber: any, matchId: any, leagueId: any) {
    this.joinedteamsService.allJoinedTeamsInLeague(matchId, leagueId).subscribe(joinedTeams => {
      this.joinedTeams = joinedTeams;
    })
  }

  getJoinedLeagues(uniqueNumber: any, matchId: any){
    this.leaguesService.getJoinedLeagues(uniqueNumber, matchId).subscribe(leagues => {
      this.leagues = leagues;
      for(let league of this.leagues){
        if(league.id == this.leagueId){
          this.league = league;
        }
      }
    })
  }
}
