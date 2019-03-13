import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
export class SwitchteamService {

  constructor(private http:HttpClient) { }

  public API = environment.host;
  public LEAGUES_API = this.API + '/api/v1';

  switchTeam(team : any, leagueId: any, teamId: any) {
    return this.http.post(this.LEAGUES_API + '/switchTeam/'+leagueId+'/'+teamId, team, httpOptions);
  }
}
