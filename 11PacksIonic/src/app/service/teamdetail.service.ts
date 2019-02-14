import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeamdetailService {

  constructor(private http:HttpClient) { }

  public API = environment.host;
  public LEAGUES_API = this.API + '/api/v1';

  getTeamDetail(uniqueNumber : any, matchId : any, teamId : any): Observable<any> {
    return this.http.get(this.LEAGUES_API+'/teamView/'+uniqueNumber+'/'+matchId+'/'+teamId);
  }

  getTeamDetailsWithPoints(teamId : any){
    return this.http.get(this.LEAGUES_API+'/teamDetailWithPoints/'+teamId); 
  }
}
