import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { TxnRequest } from '../../model/paytm';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type':'application/json','Access-Control-Allow-Origin': 'http://localhost:8080' })
};

@Injectable({
  providedIn: 'root'
})
export class AddbalanceService {

  public API = environment.host;
  public MATCHES_API = this.API + '/paytm';
  txnRequest : any;
  constructor(public http : HttpClient) { }

  addBalance(account: any){
    return this.http.post(this.MATCHES_API+'/addMoney/', account, httpOptions);
  }

  getCheckSumHashAndOtherTxnRequest(account: any, user: any) : Observable<any>{
    this.txnRequest = new TxnRequest();
    this.txnRequest.TXN_AMOUNT = account.depositedAmount
    this.txnRequest.MOBILE_NO = user.uniqueNumber;
    this.txnRequest.EMAIL = user.email;
    console.log("my detail", this.txnRequest);
    return this.http.post(this.MATCHES_API+'/generate/checksum/', this.txnRequest, httpOptions);
  }
  
}
