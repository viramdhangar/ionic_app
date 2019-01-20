import { Component } from '@angular/core';
import { MatchesService } from '../service/matches.service'
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-Matches',
  templateUrl: 'Matches.page.html',
  styleUrls: ['Matches.page.scss']
})
export class MatchesPage {

  private matches: Array<any>;
  
  constructor(private  matchesService : MatchesService, public navController : NavController){ }

  ngOnInit() {
    this.ionViewDidLoad();
    }

  ionViewDidLoad() {
    this.matchesService.getMatches().subscribe(matches => {
      this.matches = matches;
    })
  }
}
