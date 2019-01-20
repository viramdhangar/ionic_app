import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatchesPage } from './matches.page';
import { MatchesService } from '../service/matches.service'

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: MatchesPage }])
  ],
  declarations: [MatchesPage],
  providers: [
    MatchesService,
  ]
})
export class MatchesPageModule {}
