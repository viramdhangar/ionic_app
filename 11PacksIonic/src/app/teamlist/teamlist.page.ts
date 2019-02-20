import { Component, OnInit } from '@angular/core';
import { TeamService } from '../service/team.service';
import { ActivatedRoute } from '@angular/router';
import { LeaguesService } from '../service/leagues.service';
import { AlertValidatorService } from '../service/alert-validator.service';
import { MatchesService } from '../service/matches.service'

@Component({
  selector: 'app-teamlist',
  templateUrl: './teamlist.page.html',
  styleUrls: ['./teamlist.page.scss'],
})
export class TeamlistPage implements OnInit {

  teams : any = [];
  matchId : any;
  uniqueNumber : any;
  league: any;
  team : any;
  successMsg: any;
  action: any;
  match: any;
  


  constructor(private  matchesService : MatchesService, private teamService: TeamService, private leaguesService: LeaguesService, private route: ActivatedRoute, private alert: AlertValidatorService) { }

  ngOnInit() {
    this.uniqueNumber = +this.route.snapshot.paramMap.get('uniqueNumber');
    this.matchId = +this.route.snapshot.paramMap.get('matchId');
    this.league = +this.route.snapshot.paramMap.get('leagueObj');
    this.action = +this.route.snapshot.paramMap.get('action');
    this.getMatch(this.matchId);
    this.ionViewDidLoad(this.uniqueNumber, this.matchId);
  }
  ionViewDidLoad(uniqueNumber : any , matchId : any) {
    this.teamService.getTeams( uniqueNumber, matchId).subscribe(teams => {
      this.teams = teams;
    })
  }

  updateRadio(teamObj : any){
    this.team = teamObj;
  }

  joinLeague(){
   
    this.leaguesService.joinLeague(this.team, this.league, this.uniqueNumber, this.matchId).subscribe(successMsg => {
      console.log("mesage : "+successMsg.toString);
      this.successMsg = successMsg.toString;
      this.alert.validateAlert("You have joined the league");
    })
  }

  getMatch(matchId: any){
    this.matchesService.getMatch(matchId).subscribe(match => {
      this.match = match;
      console.log("this.match", this.match);
    });
  }
}
