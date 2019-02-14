import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MyjoinedleaguesPage } from './myjoinedleagues.page';

const routes: Routes = [
  {
    path: '',
    component: MyjoinedleaguesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MyjoinedleaguesPage]
})
export class MyjoinedleaguesPageModule {}
