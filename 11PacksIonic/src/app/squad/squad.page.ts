import { Component, OnInit } from '@angular/core';
import { SquadService } from '../service/squad.service';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { AlertValidatorService } from '../service/alert-validator.service';
import { LoadingController } from '@ionic/angular'; 

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
  user: any;
  uniqueNumber: any;
  action: any;
  teamId: any;

  constructor(public loadingController: LoadingController, private storage: Storage, private squadService: SquadService, private route: ActivatedRoute, private alert: AlertValidatorService) {
    this.squads = "WK";
   }

  ngOnInit() {
    this.matchId = +this.route.snapshot.paramMap.get('matchId');
    this.uniqueNumber = +this.route.snapshot.paramMap.get('uniqueNumber');
    this.teamId = +this.route.snapshot.paramMap.get('teamId');
    this.route.params.subscribe( params =>
      this.action = params['action']
    )
    this.getCurrentUser();
    if(this.action == 'EDIT' || this.action == 'COPY'){
      this.getSquadEditView(this.uniqueNumber, this.matchId , this.teamId);
    } else {
      this.ionViewDidLoad(this.matchId);
    }
  }

  async ionViewDidLoad(matchId: any) {
    const loading = await this.loadingController.create({
      message: 'Loading...'
    });
    await loading.present();
    this.squadService.getSquad(matchId).subscribe(squad => {
      this.squad = squad.players;
      loading.dismiss();
    })

  }

  onSelect(player: any) {
    if (player.selected == true) {
      if (this.totalSelected < 11) {
        if (player.playingRole == "BAT") {
          if (this.selectedBat.length < 5) {
            this.selectedBat.push(player);
            this.totalCreditUsed = this.totalCreditUsed + player.credit;
          } else {
            player.selected = false;
            this.alert.validateAlert("More then 5 batsman not allowed");
          }
        }
        if (player.playingRole == "BOWL") {
          if (this.selectedBowl.length < 5) {
            this.selectedBowl.push(player);
            this.totalCreditUsed = this.totalCreditUsed + player.credit;
          } else {
            player.selected = false;
            this.alert.validateAlert("More then 5 bowlers not allowed");
          }
        }
        if (player.playingRole == "ALL") {
          if (this.selectedAll.length < 3) {
            this.selectedAll.push(player);
            this.totalCreditUsed = this.totalCreditUsed + player.credit;
          } else {
            player.selected = false;
            this.alert.validateAlert("More then 3 allrounders not allowed");
          }
        }
        if (player.playingRole == "WK") {
          if (this.selectedWk.length < 1) {
            this.selectedWk.push(player);
            this.totalCreditUsed = this.totalCreditUsed + player.credit;
          } else {
            player.selected = false;
            this.alert.validateAlert("Only one wicket keeper allowed");
          }
        }
      } else {
        this.alert.validateAlert("Already selected 11 players");
        player.selected = false;
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
  async onSubmit(selectPlayerList: any) {
    if (this.totalSelected > 11 || this.totalSelected < 11) {
      this.alert.validateAlert("Please select 11 players");
      return false;
    }
    if (this.totalCreditUsed > 100) {
      this.alert.validateAlert("credits should not go beyond 100");
      return false;
    }
    if (this.totalCreditUsed > 100) {
      this.alert.validateAlert("credits should not go beyond 100");
      return false;
    }
    if (this.selectedWk.length !== 1) {
      this.alert.validateAlert("There should be one wicketkeeper");
      return false;
    }
    if (this.selectedBat.length < 3 || this.selectedBat.length > 5) {
      this.alert.validateAlert("3 - 5 batsman can be selected");
      return false;
    }
    if (this.selectedBowl.length < 3 || this.selectedBowl.length > 5) {
      this.alert.validateAlert("3 - 5 bowlers can be selected");
      return false;
    }
    if (this.selectedAll.length < 1 || this.selectedAll.length > 3) {
      this.alert.validateAlert("1 - 3 allrounder can be selected");
      return false;
    }
    // if all validations good then insert the team now
    const loading = await this.loadingController.create({
      message: 'Loading...'
    });
    await loading.present();
    this.squadService.createTeam(this.squadSelected, this.matchId, this.uniqueNumber, this.teamId, this.action)
    loading.dismiss();
  }

  async getSquadEditView(uniqueNumber: any, matchId1: any, teamId: any){
    const loading = await this.loadingController.create({
      message: 'Loading...'
    });
    await loading.present();
    this.squadService.getSquadEditView(uniqueNumber, matchId1, teamId).subscribe(squad => {
      console.log("players: "+squad.players);
      this.squad = squad.players;
      for(let squ of squad.players){
        if(squ.selected == true){
          this.totalCreditUsed = this.totalCreditUsed + squ.credit;
          this.totalSelected = this.totalSelected + 1;
          if(squ.playingRole == "BAT"){
            this.selectedBat.push(squ);
          }
          if(squ.playingRole == "BOWL"){
            this.selectedBowl.push(squ)
          }
          if(squ.playingRole == "ALL"){
            this.selectedAll.push(squ)
          }
          if(squ.playingRole == "WK"){
            this.selectedWk.push(squ)
          }
        }
      }
      this.squadSelected = this.selectedBat.concat(this.selectedWk).concat(this.selectedBowl).concat(this.selectedAll);
      loading.dismiss();
    })
  }

  getCurrentUser(){
    this.storage.get("user").then(res => {
      if(res){
        this.user = res;
        this.uniqueNumber = this.user.uniqueNumber;
      }
    })
  }
}