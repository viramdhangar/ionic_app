import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JoinedteamsService } from '../service/joinedteams.service';
import { TeamService } from '../service/team.service';
import { SwitchteamService } from '../service/switchteam.service';
import { ToastController } from '@ionic/angular'; 

@Component({
  selector: 'app-switchteam',
  templateUrl: './switchteam.page.html',
  styleUrls: ['./switchteam.page.scss'],
})
export class SwitchteamPage implements OnInit {

  joinedTeams: any;
  leagueId: any;
  newTeamObj: any;
  action :any;
  uniqueNumber: any;
  matchId: any;
  allCreatedTeams:any;
  availableTeamsToSwitch: any;
  successMsg: any;
  matchStatus: any;
  teamId: any;
  isSelected: boolean =false;
  
  constructor(private switchteamService: SwitchteamService, private teamService: TeamService, private joinedteamsService: JoinedteamsService, private route: ActivatedRoute, private toastController: ToastController, private router: Router) { 
    this.action="switch";
  }

  ngOnInit() {
    const matchId = +this.route.snapshot.paramMap.get('matchId');
    const uniqueNumber = +this.route.snapshot.paramMap.get('uniqueNumber');
    const leagueId = +this.route.snapshot.paramMap.get('leagueId');
    this.teamId = +this.route.snapshot.paramMap.get('teamId');
    this.matchStatus = this.route.snapshot.params['matchStatus'];
    this.leagueId = leagueId;
    this.uniqueNumber = uniqueNumber;
    this.matchId = matchId;
    this.ionViewDidLoad(uniqueNumber, matchId);
  }

  ionViewDidLoad(uniqueNumber: any, matchId: any) {
    this.teamService.getTeams( uniqueNumber, matchId).subscribe(allCreatedTeams => {
      this.allCreatedTeams = allCreatedTeams;
      this.availableTeamsToSwitch = allCreatedTeams;
    })
  }

  newTeam(team: any){
    this.isSelected = true;
    this.newTeamObj = team;
  }

  switchTeam(){
    if(this.isSelected == true){
      this.switchteamService.switchTeam(this.newTeamObj, this.leagueId, this.teamId).subscribe(successMsg => {
        console.log("mesage : "+successMsg.toString);
        this.successMsg = successMsg.toString;
        if(this.matchStatus == 'JOINED'){
          this.router.navigate(['/joinedteams', this.uniqueNumber, this.matchId, this.leagueId, this.matchStatus]);
        }else if(this.matchStatus == 'UPCOMING'){
          this.router.navigate(['/joined-teamsrank', this.uniqueNumber, this.matchId, this.leagueId, this.matchStatus]);
        }
      })
    }else{
      this.toastErrorAlert("Nothing selected");
      return false;
    }
  }
  async toastErrorAlert(errorMessage: any) {
    const toast = await this.toastController.create({
      message: errorMessage,
      showCloseButton: true,
      position: 'top',
      color: 'danger',
      closeButtonText: 'Ok',
      duration: 5000
    });
    return await toast.present();
  }
}
