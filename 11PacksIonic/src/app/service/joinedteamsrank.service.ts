import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Methods': 'GET, PUT, POST',
    'Access-Control-Allow-Origin': '*'
  }
  )
};

@Injectable({
  providedIn: 'root'
})
export class JoinedteamsrankService {

  constructor(private http: HttpClient) { }

  public API = environment.host;
  public LEAGUES_API = this.API + '/api/v1';

  getLeagueTeamsAndPoints(uniqueNumber: any, matchId: any, leagueId: any): Observable<any> {
    return this.http.get(this.LEAGUES_API + '/teamsRankAndPointsInLeague/' + uniqueNumber + '/' + matchId + '/' + leagueId);
  }

  getTeamDetailsWithPoints(teamId : any){
    return this.http.get(this.LEAGUES_API+'/teamDetailWithPoints/'+teamId); 
  }
}
