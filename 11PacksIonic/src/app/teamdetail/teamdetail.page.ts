import { Component, OnInit } from '@angular/core';
import { TeamdetailService } from '../service/teamdetail.service';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular'; 
import { TeamService } from '../service/team.service';

@Component({
  selector: 'app-teamdetail',
  templateUrl: './teamdetail.page.html',
  styleUrls: ['./teamdetail.page.scss'],
})
export class TeamdetailPage implements OnInit {

  teamDetail: any;

  uniqueNumber: any;
  matchId : any;
  teamId: any;
  action:any;
  leagueId: any;
  teamName: any;
  team1Name: string="none";
  team2Name: string="none";
  teams: any;
  username: any;

  constructor(private teamService: TeamService, public loadingController: LoadingController, private teamdetailService: TeamdetailService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.uniqueNumber = +this.route.snapshot.paramMap.get('uniqueNumber');
    this.matchId = +this.route.snapshot.paramMap.get('matchId');
    this.teamId = +this.route.snapshot.paramMap.get('teamId');
    this.leagueId = +this.route.snapshot.paramMap.get('leagueId');
    this.route.params.subscribe( params =>
      this.action = params['action']
    )
    this.getTeams();
    if(this.action == 'VIEW' || this.action == 'UPCOMING' || this.action == 'JOINED'){
      this.ionViewDidLoad(this.uniqueNumber, this.matchId, this.teamId);
    }else if(this.action == 'LIVE' || this.action == 'COMPLETED'){
      this.getTeamDetailsWithPoints(this.matchId, this.teamId);
    }
  }

  getTeams(){
    this.teamService.getTeams( this.uniqueNumber, this.matchId).subscribe(teams => {
      this.teams = teams;
    })
  }

  async ionViewDidLoad(uniqueNumber : any, matchId : any, teamId : any) {
    const loading = await this.loadingController.create({
      message: 'Loading...'
    });
    await loading.present();
    this.teamdetailService.getTeamDetail(uniqueNumber, matchId, teamId).subscribe(teamDetail => {
      this.teamDetail = teamDetail.players;
      this.username = teamDetail.uniqueNumber;
      this.teamName = teamDetail.teamName;
      console.log("team : ",teamDetail.players);
      for(let team of this.teamDetail){
        console.log(team.name, team.playingRole);
        if(this.team1Name == 'none'){
          this.team1Name = team.playingTeamName;
        }
        if(this.team1Name != team.playingTeamName){
          this.team2Name = team.playingTeamName;
        }
      }
      loading.dismiss();
    })
  }
  async getTeamDetailsWithPoints(matchId: any, teamId: any) {
    const loading = await this.loadingController.create({
      message: 'Loading...'
    });
    await loading.present();
    this.teamdetailService.getTeamDetailsWithPoints(matchId, teamId).subscribe(teamDetail => {
      this.teamDetail = teamDetail;
      console.log("team : ",teamDetail);
      for(let team of this.teamDetail){
        this.teamName = team.teamName;
        console.log(team.name, team.playingRole);
        if(this.team1Name == 'none'){
          this.team1Name = team.playingTeamName;
        }
        if(this.team1Name != team.playingTeamName){
          this.team2Name = team.playingTeamName;
        }
        this.username = team.uniqueNumber;
      }
      loading.dismiss();
    })
  }
}
