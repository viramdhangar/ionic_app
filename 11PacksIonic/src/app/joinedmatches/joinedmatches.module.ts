import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { JoinedmatchesPage } from './joinedmatches.page';

const routes: Routes = [
  {
    path: '',
    component: JoinedmatchesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [JoinedmatchesPage]
})
export class JoinedmatchesPageModule {}
