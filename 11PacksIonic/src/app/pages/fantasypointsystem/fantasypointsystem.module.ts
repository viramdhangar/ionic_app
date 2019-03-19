import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FantasypointsystemPage } from './fantasypointsystem.page';

const routes: Routes = [
  {
    path: '',
    component: FantasypointsystemPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FantasypointsystemPage]
})
export class FantasypointsystemPageModule {}
