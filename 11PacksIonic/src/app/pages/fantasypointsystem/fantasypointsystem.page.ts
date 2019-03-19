import { Component, OnInit } from '@angular/core';
import { FantasypointsystemService } from './fantasypointsystem.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-fantasypointsystem',
  templateUrl: './fantasypointsystem.page.html',
  styleUrls: ['./fantasypointsystem.page.scss'],
})
export class FantasypointsystemPage implements OnInit {

  fantasyPoints : any;
  fantasyPointsList: any;

  constructor(private fantasypointsystem: FantasypointsystemService, private loadingController: LoadingController) {
    this.fantasyPoints = "T20";
   }

  ngOnInit() {
    this.ionViewDidLoad();
  }

  async ionViewDidLoad(){
    const loading = await this.loadingController.create({
      message: 'Loading...'
    });
    await loading.present();
    this.fantasypointsystem.getFantasyPoints().subscribe(response=>{
      this.fantasyPointsList = response;
      loading.dismiss();
    });
  }

}
