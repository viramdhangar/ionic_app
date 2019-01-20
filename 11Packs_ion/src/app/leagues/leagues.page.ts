import { Component, OnInit } from '@angular/core';
import { LeaguesService } from '../service/leagues.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-leagues',
  templateUrl: './leagues.page.html',
  styleUrls: ['./leagues.page.scss'],
})
export class LeaguesPage implements OnInit {

  leagues : Array<any>;
  matchId : any;

  constructor(private leaguesService: LeaguesService, private route: ActivatedRoute) { }

  ngOnInit() {
    const matchId = +this.route.snapshot.paramMap.get('id');
    this.ionViewDidLoad(matchId);
  }

  ionViewDidLoad(matchId : any) {
    this.leaguesService.getLeagues(matchId).subscribe(leagues => {
      this.matchId = matchId;
      this.leagues = leagues;
    })
  }

}
