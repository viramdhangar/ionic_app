import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type':'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class SquadService {

  public API = 'https://11packs.cfapps.io';
  public MATCHES_API = this.API + '/api/v1';

  constructor(public http : HttpClient) { }

  getSquad(matchId : any): Observable<any> {
    return this.http.get(this.MATCHES_API+'/squad/'+matchId);
  }

}
