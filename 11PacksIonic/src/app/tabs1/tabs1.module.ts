import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { Tabs1PageRoutingModule } from './tabs1.router.module';

import { Tabs1Page } from './tabs1.page';

const routes: Routes = [
  {
    path: '',
    component: Tabs1Page
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Tabs1PageRoutingModule
  ],
  declarations: [Tabs1Page]
})
export class Tabs1PageModule {}
