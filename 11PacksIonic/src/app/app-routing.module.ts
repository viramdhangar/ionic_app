import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'leagues/:id', loadChildren: './leagues/leagues.module#LeaguesPageModule' },
  { path: 'squad/:id', loadChildren: './squad/squad.module#SquadPageModule' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
