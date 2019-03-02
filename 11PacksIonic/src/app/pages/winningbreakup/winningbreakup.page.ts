import { Component, OnInit, Input } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { LeaguesService } from '../../service/leagues.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-winningbreakup',
  templateUrl: './winningbreakup.page.html',
  styleUrls: ['./winningbreakup.page.scss'],
})
export class WinningbreakupPage implements OnInit {

  @Input() value: number;
  
  winningBreakup: any;

  constructor(navParams: NavParams, private leaguesService: LeaguesService, private modalController: ModalController) { }

  ngOnInit() {
    this.ionViewDidLoad(this.value);
  }

  ionViewDidLoad(value : number) {
    this.leaguesService.getWinningBreakup(value).subscribe((res)=>{
      this.winningBreakup = res;
      console.log("values: ",this.winningBreakup);
    });
  }

  closeModal()
  {
    this.modalController.dismiss();
  }
}
