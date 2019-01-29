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

  constructor(private teamService: TeamService, private route: ActivatedRoute) { }

  ngOnInit() {
    const uniqueNumber = +this.route.snapshot.paramMap.get('uniqueNumber');
    const matchId = +this.route.snapshot.paramMap.get('matchId');
    this.matchId = matchId;
    this.uniqueNumber= uniqueNumber;
    this.ionViewDidLoad(uniqueNumber, matchId);
  }

  ionViewDidLoad(uniqueNumber : any , matchId : any) {
    this.teamService.getTeams( uniqueNumber, matchId).subscribe(teams => {
      this.teams = teams;
    })
  }

}
