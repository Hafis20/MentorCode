import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GetWallet } from '../model/walletModel';

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  constructor(private http:HttpClient) { }

  userWallet(id:string):Observable<GetWallet>{
    return this.http.get<GetWallet>(`${environment.walletURL}/getWallet/?userId=${id}`);
  }
}
