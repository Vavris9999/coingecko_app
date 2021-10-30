import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Coin } from 'src/app/models/coin.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiBase = "https://api.coingecko.com/api/v3/";

  constructor(
    private http: HttpClient
  ) { }
  getCoins$(selected_option){
    return this.http.get<Coin[]>(this.apiBase + "coins/markets?vs_currency="+ selected_option+"&order=market_cap_desc&per_page=100&page=2&sparkline=false");
  }
  getCoin$(id){
    return this.http.get<Coin[]>(this.apiBase + "coins/bitcoin?localization=false&tickers=false&market_data=false&community_data=false&developer_data=false&sparkline=false");
  }
  

 
}
