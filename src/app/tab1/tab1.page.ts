import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Coin } from '../models/coin.model';
import { ApiService } from '../services/api/api.service';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  coins: Coin[] = [];
  coins$: Observable<Coin[]>;

  constructor(
    private apiService:ApiService
  ) {
    this.coins$ =  this.apiService.getCoins$();
    this.apiService.getCoins$().subscribe(data =>{
      console.log(data);
      this.coins = data;
    });

  }

}
