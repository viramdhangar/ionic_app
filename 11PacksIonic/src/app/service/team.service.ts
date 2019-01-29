import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(private http:HttpClient) { }

  public API = 'https://11packs.cfapps.io';
  public LEAGUES_API = this.API + '/api/v1';

  getTeams(uniqueNumber : any, matchId : any): Observable<any> {
    return this.http.get(this.LEAGUES_API+'/teamsOfMatch/'+uniqueNumber+'/'+matchId);
  }
}
