import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type':'application/json','Access-Control-Allow-Origin': 'http://localhost:8080' })
};

@Injectable({
  providedIn: 'root'
})
export class FantasypointsystemService {

  public API = environment.host;
  public MATCHES_API = this.API + '/api/v1';

  constructor(public http : HttpClient) { }

  getFantasyPoints(){
    return this.http.get(this.MATCHES_API+'/fantasyPoints');
  }
}
