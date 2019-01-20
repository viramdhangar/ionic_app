import { Component, OnInit } from '@angular/core';
import { SquadService } from '../service/squad.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-squad',
  templateUrl: './squad.page.html',
  styleUrls: ['./squad.page.scss'],
})
export class SquadPage implements OnInit {

  squad : Array<any>;
  squadSelected : Array<any> = [];
  matchId : any;
  buttonColor: string = '#000';

  constructor(private squadService: SquadService, private route: ActivatedRoute) { }

  ngOnInit() {
    const matchId = +this.route.snapshot.paramMap.get('id');
    this.ionViewDidLoad(matchId);
  }

  ionViewDidLoad(matchId : any) {
    this.squadService.getSquad(matchId).subscribe(squad => {
      this.squad = squad.players;
    })
  }

  onSelect(player : any, index : number){
    alert("player Index" +this.squadSelected.includes(player) + "  Index"+index);
    
    if(this.squadSelected.includes(player)){
      this.squadSelected.splice(player);
      alert("object present removed");
    }else{
      this.squadSelected.push(player);
      alert("object added");
    }
    alert("number of players selected :"+this.squadSelected.length);
  }

}
