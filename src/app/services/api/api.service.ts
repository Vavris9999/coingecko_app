import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Coin } from 'src/app/models/coin.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiBase = "https://api.coingecko.com/api/v3/coins";

  constructor(
    private http: HttpClient
  ) { }
  getCoins$(){
    return this.http.get<Coin[]>(this.apiBase + "/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false");
  }
 
}
