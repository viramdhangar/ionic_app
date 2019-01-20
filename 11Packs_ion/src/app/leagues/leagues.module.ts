import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { LeaguesPage } from './leagues.page';
import { LeaguesService } from '../service/leagues.service'

const routes: Routes = [
  {
    path: '',
    component: LeaguesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LeaguesPage],
  providers: [
    LeaguesService,
  ]
})
export class LeaguesPageModule {}
