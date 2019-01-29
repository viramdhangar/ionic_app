import { Component, OnInit } from '@angular/core';
import { SquadService } from '../service/squad.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-squad',
  templateUrl: './squad.page.html',
  styleUrls: ['./squad.page.scss'],
})
export class SquadPage implements OnInit {

  squad: Array<any>;
  squadSelected: Array<any> = [];
  matchId: any;
  buttonColor: string = '#000';
  totalSelected: number = 0;
  totalCreditUsed: number = 0;

  selectedBat: any = [];
  selectedBowl: any = [];
  selectedAll: any = [];
  selectedWk: any = [];
  squads : any;
  successMsg : any = "";

  constructor(private squadService: SquadService, private route: ActivatedRoute) {
    this.squads = "WK";
   }

  ngOnInit() {
    const matchId = +this.route.snapshot.paramMap.get('id');
    const uniqueNumber = +this.route.snapshot.paramMap.get('uniqueNumber');
    const matchId1 = +this.route.snapshot.paramMap.get('matchId');
    const teamId = +this.route.snapshot.paramMap.get('teamId');
    this.matchId = matchId;
    this.ionViewDidLoad(matchId);
  }

  ionViewDidLoad(matchId: any) {
    this.squadService.getSquad(matchId).subscribe(squad => {
      this.squad = squad.players;
    })

  }
  /*getSquadEditView(uniqueNumber: any, matchId1: any, teamId: any){
    this.squadService.getSquadEditView(uniqueNumber, matchId1, teamId).subscribe(squad => {
      this.squad = squad.players;
    })
  }*/
  onSelect(player: any) {
    if (player.selected == true) {
      if (this.totalSelected < 11) {
        if (player.playingRole == "BAT") {
          if (this.selectedBat.length < 5) {
            this.selectedBat.push(player);
            this.totalCreditUsed = this.totalCreditUsed + player.credit;
          }
        }
        if (player.playingRole == "BOWL") {
          if (this.selectedBowl.length < 5) {
            this.selectedBowl.push(player);
            this.totalCreditUsed = this.totalCreditUsed + player.credit;
          }
        }
        if (player.playingRole == "ALL") {
          if (this.selectedAll.length < 3) {
            this.selectedAll.push(player);
            this.totalCreditUsed = this.totalCreditUsed + player.credit;
          }
        }
        if (player.playingRole == "WK") {
          if (this.selectedWk.length < 1) {
            this.selectedWk.push(player);
            this.totalCreditUsed = this.totalCreditUsed + player.credit;
          }
        }
      } else {
        alert("Already selected 11 players");
      }
    } else {
      if (player.playingRole == "BAT") {
        this.removePlayer(player, this.selectedBat);
      }
      if (player.playingRole == "BOWL") {
        this.removePlayer(player, this.selectedBowl);
      }
      if (player.playingRole == "ALL") {
        this.removePlayer(player, this.selectedAll);
      }
      if (player.playingRole == "WK") {
        this.removePlayer(player, this.selectedWk);
      }
    }
    this.validatePlayerList(player);
  }
  removePlayer(player: any, playerList: any) {
    const index: number = playerList.indexOf(player);
    if (index !== -1) {
      playerList.splice(index, 1);
      this.totalCreditUsed = this.totalCreditUsed - player.credit;
    }
  }
  validatePlayerList(player: any) {
    this.totalSelected = this.selectedBat.length + this.selectedBowl.length + this.selectedAll.length + this.selectedWk.length
    this.squadSelected = this.selectedBat.concat(this.selectedWk).concat(this.selectedBowl).concat(this.selectedAll);
  }
  onSubmit(selectPlayerList: any) {
    alert(this.totalSelected);
    if (this.totalSelected > 11 || this.totalSelected < 11) {
      alert("Please select 11 players");
      return false;
    }
    if (this.totalCreditUsed > 100) {
      alert("credits should not go beyond 100");
      return false;
    }
    if (this.totalCreditUsed > 100) {
      alert("credits should not go beyond 100");
      return false;
    }
    if (this.selectedWk.length !== 1) {
      alert("There should be one wicketkeeper");
      return false;
    }
    if (this.selectedBat.length < 3 || this.selectedBat.length > 5) {
      alert("3 - 5 batsman can be selected");
      return false;
    }
    if (this.selectedBowl.length < 3 || this.selectedBowl.length > 5) {
      alert("3 - 5 bowlers can be selected");
      return false;
    }
    if (this.selectedAll.length < 1 || this.selectedAll.length > 3) {
      alert("1 - 3 allrounder can be selected");
      return false;
    }
    // if all validations good then insert the team now
    alert("Good to go"); 
    this.squadService.createTeam(this.squadSelected, this.matchId).subscribe(successMsg => {
      this.successMsg = successMsg;
    })
  }
}
