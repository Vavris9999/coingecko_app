import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Coin } from '../models/coin.model';
import { ApiService } from '../services/api/api.service';
import { StorageService } from '../services/storage.service';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  coins: Coin[] = [];
  coins$: Observable<Coin[]>;
  selected_curr: string = "usd";
  checkedCoins:string[];
  unCheckedCoins:string[];

  constructor(
    private apiService:ApiService,
    private storageService:StorageService
  ) {
    
    this.load_value();
  }

  doRefresh(event) {  
    this.load_value();
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  } 

  async favouriteCrypto(name:string,e){
    if(e.detail.checked==true){
      this.storageService.addFavouriteCrypto(name); 
    }else{
      this.storageService.deleteFavouriteCrypto(name);
    }
  }

  async curr_changed(){
    await this.storageService.changeCurr(this.selected_curr);
    this.load_value(); 
  
  }

  async load_value(){
    let result = await this.storageService.getCurr();
    if(result){
      this.selected_curr=result;
    }
    let fav: string[] = await this.storageService.getFavouriteCrypto();
    this.checkedCoins=fav;
    this.coins$ =  this.apiService.getCoins$(this.selected_curr);
    this.getCheckedUnchecked();
  }
  
  getCheckedUnchecked(){
    let index = 0;
    let unCheckedCoins:string[] = []; 
     
    this.coins$.forEach(element => {
      while (index < element.length) {
        unCheckedCoins.push(element[index]["name"]);
          if(this.checkedCoins){
            this.checkedCoins.forEach(check=>{
          if(check == element[index]["name"]){
            delete unCheckedCoins[index];
          }
        });
      }
      index++;
      }
    });
    this.unCheckedCoins = unCheckedCoins;
  }
}
