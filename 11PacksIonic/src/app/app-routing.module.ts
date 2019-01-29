import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'leagues/:id', loadChildren: './leagues/leagues.module#LeaguesPageModule' },
  { path: 'squad/:id', loadChildren: './squad/squad.module#SquadPageModule' },
  { path: 'teamsOfMatch/:uniqueNumber/:matchId', loadChildren: './teams/teams.module#TeamsPageModule' },
  { path: 'teamView/:uniqueNumber/:matchId/:teamId', loadChildren: './teamdetail/teamdetail.module#TeamdetailPageModule' },
  { path: 'teamEdit/:uniqueNumber/:matchId/:teamId', loadChildren: './squad/squad.module#SquadPageModule' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
