import { Component, OnInit } from '@angular/core';
import { TeamdetailService } from '../service/teamdetail.service';
import { ActivatedRoute } from '@angular/router';

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

  constructor(private teamdetailService: TeamdetailService, private route: ActivatedRoute) { }

  ngOnInit() {
    const uniqueNumber = +this.route.snapshot.paramMap.get('uniqueNumber');
    const matchId = +this.route.snapshot.paramMap.get('matchId');
    const teamId = +this.route.snapshot.paramMap.get('teamId');
    this.ionViewDidLoad(uniqueNumber, matchId, teamId);
  }

  ionViewDidLoad(uniqueNumber : any, matchId : any, teamId : any) {
    this.teamdetailService.getTeamDetail(uniqueNumber, matchId, teamId).subscribe(teamDetail => {
      this.teamDetail = teamDetail.players;
    })
  }

}
