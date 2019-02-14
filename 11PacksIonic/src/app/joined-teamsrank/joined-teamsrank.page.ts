import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JoinedteamsrankService } from '../service/joinedteamsrank.service';
import { LeaguesService } from '../service/leagues.service';
import { JoinedteamsService } from '../service/joinedteams.service';

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

  constructor(private joinedteamsService: JoinedteamsService, private joinedteamsrankService: JoinedteamsrankService, private leaguesService: LeaguesService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.matchId = +this.route.snapshot.paramMap.get('matchId');
    this.uniqueNumber = +this.route.snapshot.paramMap.get('uniqueNumber');
    this.leagueId = +this.route.snapshot.paramMap.get('leagueId');
    this.matchStatus = this.route.snapshot.params['matchStatus'];
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
  getAllTeams(matchId: any, leagueId: any){
    this.joinedteamsService.allJoinedTeamsInLeague(matchId, leagueId).subscribe(joinedTeams => {
      this.joinedTeams = joinedTeams;
      console.log("without points:: "+this.joinedTeams);
      for(let team of this.joinedTeams){
        team.teamRank = 1;
        team.points = 0;
      }
    })
  }
}
