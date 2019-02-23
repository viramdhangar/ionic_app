import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular'; 
import { SquadService } from '../../service/squad.service';
import { throwError, Observable, Subject, asapScheduler, pipe, of, from, interval, merge, fromEvent, SubscriptionLike, PartialObserver } from 'rxjs';
import { map, filter, scan, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-starplayer',
  templateUrl: './starplayer.page.html',
  styleUrls: ['./starplayer.page.scss'],
})
export class StarplayerPage implements OnInit {

  // "value" passed in componentProps
  //@Input() value: any;

  playerList: any;
  captain: any;
  viceCaptain: any;
  uniqueNumber:any;
  matchId: any;
  teamId: any;
  action: any;

  constructor(private router: Router, private route: ActivatedRoute, private storage: Storage, public loadingController: LoadingController, private squadService: SquadService, private toastController: ToastController) {
    // componentProps can also be accessed at construction time using NavParams
  }


  ngOnInit() {
    this.uniqueNumber = +this.route.snapshot.paramMap.get('uniqueNumber');
    this.matchId = +this.route.snapshot.paramMap.get('matchId');
    this.teamId = +this.route.snapshot.paramMap.get('teamId');
    this.route.params.subscribe( params =>
      this.action = params['action']
    )
    console.log("action ", this.action);
    this.getPlayerList();
    for (let player of this.playerList) {
      console.log("player name ", player.name);
    }
  }

  async submitPlayers() {

    console.log("captain ", this.captain);
    console.log("viceCaptain ", this.viceCaptain);
    console.log("Submit called", this.playerList);

    if (this.captain == 'undefined') {
      alert("Please select Captain");
    } else if (this.viceCaptain == 'undefined') {
      alert("Please select Vice Captain");
    } else if (this.captain == this.viceCaptain) {
      alert("Captain and Vice Captain can not be same.");
    } else {
      for (let player of this.playerList) {
        if (player.pid == this.captain) {
          player.captain = true;
        }
        if (player.pid == this.viceCaptain) {
          player.viceCaptain = true;
        }
      }
      for (let player of this.playerList) {
        console.log("player", player.name + "  Captaion  " + player.captain + "    Vice  " + player.viceCaptain);
      }

      // if all validations good then insert the team now
      const loading = await this.loadingController.create({
        message: 'Loading...'
      });
      await loading.present();
      console.log("this.playerList ", this.playerList);
      this.squadService.createTeam(this.playerList, this.matchId, this.uniqueNumber, this.teamId, this.action)
      loading.dismiss();
      this.storage.remove("selectedTeam");
    }
  }
  async toastAlert(errorMessage: any) {
    const toast = await this.toastController.create({
      message: errorMessage,
      showCloseButton: true,
      position: 'top',
      closeButtonText: 'Done',
      duration: 2000
    });
    return await toast.present();
  }

  getPlayerList() {
    this.storage.get("selectedTeam").then(res => {
      if (res) {
        this.playerList = res;
      }
    })
  }

  getOuterName(ev: Event) {
    console.log("ev", ev);
  }

}
