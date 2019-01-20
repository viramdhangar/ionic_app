import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type':'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class LeaguesService {

  constructor(private http:HttpClient) { }

  public API = 'https://11packs.cfapps.io';
  public LEAGUES_API = this.API + '/api/v1';

  getLeagues(matchId : any): Observable<any> {
    return this.http.get(this.LEAGUES_API+'/leagues/'+matchId);
  }
}
