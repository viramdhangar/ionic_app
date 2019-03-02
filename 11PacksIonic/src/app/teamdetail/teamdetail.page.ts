import { Component, OnInit } from '@angular/core';
import { TeamdetailService } from '../service/teamdetail.service';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular'; 

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

  constructor(public loadingController: LoadingController, private teamdetailService: TeamdetailService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.uniqueNumber = +this.route.snapshot.paramMap.get('uniqueNumber');
    this.matchId = +this.route.snapshot.paramMap.get('matchId');
    this.teamId = +this.route.snapshot.paramMap.get('teamId');
    this.route.params.subscribe( params =>
      this.action = params['action']
    )
    if(this.action == 'VIEW'){
      this.ionViewDidLoad(this.uniqueNumber, this.matchId, this.teamId);
    }else if(this.action == 'LIVE' || this.action == 'COMPLETED'){
      this.getTeamDetailsWithPoints(this.matchId, this.teamId);
    }
  }

  async ionViewDidLoad(uniqueNumber : any, matchId : any, teamId : any) {
    const loading = await this.loadingController.create({
      message: 'Loading...'
    });
    await loading.present();
    this.teamdetailService.getTeamDetail(uniqueNumber, matchId, teamId).subscribe(teamDetail => {
      this.teamDetail = teamDetail.players;
      console.log("team : ",teamDetail.players);
      for(let team of this.teamDetail){
        console.log(team.name, team.playingRole);
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
        console.log(team.name, team.playingRole);
      }
      loading.dismiss();
    })
  }
}
