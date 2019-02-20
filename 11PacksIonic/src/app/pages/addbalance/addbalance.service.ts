import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type':'application/json','Access-Control-Allow-Origin': 'http://localhost:8080' })
};

@Injectable({
  providedIn: 'root'
})
export class AddbalanceService {

  public API = environment.host;
  public MATCHES_API = this.API + '/api/v1';

  constructor(public http : HttpClient) { }

  addBalance(account: any){
    return this.http.post(this.MATCHES_API+'/addMoney/', account, httpOptions);
  }
  
}
