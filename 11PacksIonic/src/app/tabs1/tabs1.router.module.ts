import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Tabs1Page } from './tabs1.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: Tabs1Page,
    children: [
      {
        path: 'matches/tabs1/leagues/:id',
        children: [
          {
            path: '',
            loadChildren: '../leagues/leagues.module#LeaguesPageModule'
          }
        ]
      },
      {
        path: 'tab2/:username',
        children: [
          {
            path: '',
            loadChildren: '../tab2/tab2.module#Tab2PageModule'
          }
        ]
      },
      {
        path: 'tab3',
        children: [
          {
            path: '',
            loadChildren: '../tab3/tab3.module#Tab3PageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/matches/tabs1/leagues/:id',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/matches/tabs1/leagues/:id',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tabs1PageRoutingModule {}
