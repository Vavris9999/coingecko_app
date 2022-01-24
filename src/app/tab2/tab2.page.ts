import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Coin } from '../models/coin.model';
import { StorageService } from '../services/storage.service';
import { ApiService } from '../services/api/api.service';

type CoinValues = {
  id:string;
  name: string;
  rank: number;
  price: DoubleRange;
  image:string;
}
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page {
  coins: Coin[] = [];
  allCoins$: Observable<Coin[]>;
  favCoins$: Coin[];
  selected_curr: string = "usd";
  favouriteCoins:string[];
  favouriteCoinsValues:CoinValues[];

  constructor(private apiService:ApiService,
    private storageService:StorageService) {
      this.load_value();
  }
  doRefresh(event) {  
    this.load_value();
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }  
  async load_value(){
    let result: string = await this.storageService.getCurr();
    if(result){
      this.selected_curr=result;
    }
    this.favouriteCoins = await this.storageService.getFavouriteCrypto();
    this.allCoins$ = this.apiService.getCoins$(this.selected_curr);
    let index = 0;
    let c:CoinValues[] = []; 
    this.allCoins$.forEach(element => {
      while (index < element.length) {
        if(this.favouriteCoins){
        this.favouriteCoins.forEach(element2 =>{
          if(element[index]["name"] === element2){
            c.push({id:element[index]["id"],name:element[index]["name"],rank:element[index]["market_cap_rank"],price:element[index]["current_price"],image:element[index]["image"]});
          }
        });
      }
        index++;
      }
    });
    this.favouriteCoinsValues = c;
  }
  async favouriteCrypto(name:string,e){
    if(e.detail.checked==true){
      this.storageService.addFavouriteCrypto(name); 
    }else{
      this.storageService.deleteFavouriteCrypto(name);
    }
  }

}
