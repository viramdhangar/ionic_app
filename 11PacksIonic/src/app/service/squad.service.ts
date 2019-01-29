import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MatchTeam } from '../model/matchteam';

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
export class SquadService {

  public API = 'https://11packs.cfapps.io';
  public MATCHES_API = this.API + '/api/v1';
  matchTeam : MatchTeam;

  constructor(public http : HttpClient) {}

  getSquad(matchId : any): Observable<any> {
    return this.http.get(this.MATCHES_API+'/squad/'+matchId);
  }

  createTeam(squad: any, matchId: any) {
    alert("matchId : "+matchId);
    this.matchTeam = new MatchTeam();
    this.matchTeam.matchId = matchId;
    this.matchTeam.uniqueNumber = "8097547286";
    this.matchTeam.players = squad;
    alert(this.matchTeam.uniqueNumber);
    return this.http.post(this.MATCHES_API + '/createTeam/', this.matchTeam, httpOptions)
  }
  /*getSquadEditView(uniqueNumber: any, matchId1: any, teamId: any) : Observable<any> {
    return this.http.get(this.MATCHES_API+'/teamEdit/'+uniqueNumber+'/'+matchId1+'/'+teamId);
  }*/
}
