import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthguardService } from './service/authguard.service';

const routes: Routes = [
  { path: '', loadChildren: './pages/home/home.module#HomePageModule', pathMatch:'full'},
 // { path: '', loadChildren: './pages/home/home.module#HomePageModule' },
  //{ path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'tabs', loadChildren: './tabs/tabs.module#TabsPageModule', canActivate:[AuthguardService]},
  { path: 'tabs/matches', loadChildren: './tabs/tabs.module#TabsPageModule', canActivate:[AuthguardService]},
  { path: 'leagues/:uniqueNumber/:id/:joinedLeague', loadChildren: './leagues/leagues.module#LeaguesPageModule' },
  { path: 'leagues/:uniqueNumber/:id/:joinedLeague/:matchStatus', loadChildren: './leagues/leagues.module#LeaguesPageModule' },
  { path: 'leagues/:id', loadChildren: './leagues/leagues.module#LeaguesPageModule' },
  { path: 'squad/:matchId', loadChildren: './squad/squad.module#SquadPageModule' },
  { path: 'teamsOfMatch/:uniqueNumber/:matchId', loadChildren: './teams/teams.module#TeamsPageModule' },
  { path: 'teamView/:uniqueNumber/:matchId/:teamId/:action', loadChildren: './teamdetail/teamdetail.module#TeamdetailPageModule' },
  { path: 'teamEdit/:uniqueNumber/:matchId/:teamId/:action', loadChildren: './squad/squad.module#SquadPageModule' },
  { path: 'teamlist/:uniqueNumber/:matchId/:leagueObj/:action', loadChildren: './teamlist/teamlist.module#TeamlistPageModule' },
  { path: 'edit-team', loadChildren: './edit-team/edit-team.module#EditTeamPageModule' },
  { path: 'joinedteams/:uniqueNumber/:matchId/:leagueId', loadChildren: './joinedteams/joinedteams.module#JoinedteamsPageModule' },
  { path: 'joinedteams/:uniqueNumber/:matchId/:leagueId/:matchStatus', loadChildren: './joinedteams/joinedteams.module#JoinedteamsPageModule' },
  { path: 'switchteam/:uniqueNumber/:matchId/:leagueId', loadChildren: './switchteam/switchteam.module#SwitchteamPageModule' },
  { path: 'joinedmatches', loadChildren: './joinedmatches/joinedmatches.module#JoinedmatchesPageModule' },
  { path: 'myjoinedleagues/:uniqueNumber/:matchId/:matchStatus', loadChildren: './myjoinedleagues/myjoinedleagues.module#MyjoinedleaguesPageModule' },
  { path: 'joined-teamsrank/:uniqueNumber/:matchId/:leagueId/:matchStatus', loadChildren: './joined-teamsrank/joined-teamsrank.module#JoinedTeamsrankPageModule' },
  { path: 'register', loadChildren: './pages/register/register.module#RegisterPageModule' },
  { path: 'verification', loadChildren: './pages/verification/verification.module#VerificationPageModule' },
  { path: 'refer', loadChildren: './pages/refer/refer.module#ReferPageModule' },
  { path: 'account/:username', loadChildren: './pages/account/account.module#AccountPageModule' },
  { path: 'addbalance', loadChildren: './pages/addbalance/addbalance.module#AddbalancePageModule' },
 // { path: 'home', loadChildren: './pages/home/home.module#HomePageModule' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
