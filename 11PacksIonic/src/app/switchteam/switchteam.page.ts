import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JoinedteamsService } from '../service/joinedteams.service';
import { TeamService } from '../service/team.service';
import { SwitchteamService } from '../service/switchteam.service';

@Component({
  selector: 'app-switchteam',
  templateUrl: './switchteam.page.html',
  styleUrls: ['./switchteam.page.scss'],
})
export class SwitchteamPage implements OnInit {

  joinedTeams: any;
  leagueId: any;
  existingTeamObj: any;
  newTeamObj: any;
  action :any;
  uniqueNumber: any;
  matchId: any;
  allCreatedTeams:any;
  availableTeamsToSwitch: any;
  successMsg: any;

  constructor(private switchteamService: SwitchteamService, private teamService: TeamService, private joinedteamsService: JoinedteamsService, private route: ActivatedRoute) { 
    this.action="switch";
  }

  ngOnInit() {
    const matchId = +this.route.snapshot.paramMap.get('matchId');
    const uniqueNumber = +this.route.snapshot.paramMap.get('uniqueNumber');
    const leagueId = +this.route.snapshot.paramMap.get('leagueId');
    this.leagueId = leagueId;
    this.uniqueNumber = uniqueNumber;
    this.matchId = matchId;
    this.ionViewDidLoad(uniqueNumber, matchId, leagueId);
    this.getTeamsToSwitch(uniqueNumber, matchId);
  }

  ionViewDidLoad(uniqueNumber: any, matchId: any, leagueId: any) {
    this.joinedteamsService.myJoinedTeamsInLeague(uniqueNumber, matchId, leagueId).subscribe(joinedTeams => {
      this.joinedTeams = joinedTeams;
      console.log(this.joinedTeams);
    })
  }

  existingTeam(team: any){
    this.existingTeamObj = team;
  }

  newTeam(team: any){
    this.newTeamObj = team;
  }

  getTeamsToSwitch(uniqueNumber : any , matchId : any) {
    this.teamService.getTeams( uniqueNumber, matchId).subscribe(allCreatedTeams => {
      this.allCreatedTeams = allCreatedTeams;
      this.availableTeamsToSwitch = allCreatedTeams;
    })
  }

  switchTeam(){
    console.log("new : "+this.newTeamObj.teamName+" league"+this.leagueId+" old"+this.existingTeamObj.teamName);
    this.switchteamService.switchTeam(this.newTeamObj, this.leagueId, this.existingTeamObj.id).subscribe(successMsg => {
      console.log("mesage : "+successMsg.toString);
      this.successMsg = successMsg.toString;
    })
  }
}
