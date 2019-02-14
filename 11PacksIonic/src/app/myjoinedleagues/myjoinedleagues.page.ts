import { Component, OnInit } from '@angular/core';
import { MyjoinedleaguesService } from '../service/myjoinedleagues.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-myjoinedleagues',
  templateUrl: './myjoinedleagues.page.html',
  styleUrls: ['./myjoinedleagues.page.scss'],
})
export class MyjoinedleaguesPage implements OnInit {

  leagues : Array<any>;
  matchId : any;
  matchStatus: any;
  uniqueNumber: any;

  constructor(private myjoinedleaguesService: MyjoinedleaguesService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.matchId = +this.route.snapshot.paramMap.get('matchId');
    this.uniqueNumber = +this.route.snapshot.paramMap.get('uniqueNumber');
    this.matchStatus = this.route.snapshot.params['matchStatus'];
    /*this.route.params.subscribe( params =>
        this.matchStatus = params['matchStatus']
    )*/
    this.ionViewDidLoad(this.uniqueNumber, this.matchId);
  }

  ionViewDidLoad(uniqueNumber: any, matchId: any) {
    this.myjoinedleaguesService.getJoinedLeagues(uniqueNumber, matchId).subscribe(leagues => {
      this.matchId = matchId;
      this.leagues = leagues;
      console.log(this.leagues);
    })
  }

}
