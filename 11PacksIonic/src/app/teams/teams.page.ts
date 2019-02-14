import { Component, OnInit } from '@angular/core';
import { TeamService } from '../service/team.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.page.html',
  styleUrls: ['./teams.page.scss'],
})
export class TeamsPage implements OnInit {

  teams : any = [];
  matchId : any;
  uniqueNumber : any;
  editFlag: any;
  copyFlag: any;
  viewFlag: any;

  constructor(private teamService: TeamService, private route: ActivatedRoute) { 
    this.editFlag="EDIT";
    this.copyFlag="COPY";
    this.viewFlag="VIEW";
  }

  ngOnInit() {
    this.uniqueNumber = +this.route.snapshot.paramMap.get('uniqueNumber');
    this.matchId = +this.route.snapshot.paramMap.get('matchId');
    this.ionViewDidLoad(this.uniqueNumber, this.matchId);
  }

  ionViewDidLoad(uniqueNumber : any , matchId : any) {
    this.teamService.getTeams( uniqueNumber, matchId).subscribe(teams => {
      this.teams = teams; 
    }) 
  }

}
