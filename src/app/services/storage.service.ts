import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
const CURR_KEY = 'curr';
const CRYPTO_KEY = 'crypto';
@Injectable({
  providedIn: 'root'
})

export class StorageService { 
  constructor(private storage: Storage) {
  }
  changeCurr(item :string):Promise<string>{
       return this.storage.set(CURR_KEY,item);
  
  }
  getCurr(){
    return this.storage.get(CURR_KEY).then((val:string) => { 
      return val;
    });
}

addFavouriteCrypto(item :string):Promise<any>{
  return this.storage.get(CRYPTO_KEY).then((items:string[])=>{
    if(items){
      items.push(item);
      return this.storage.set(CRYPTO_KEY,items);
    }else{
      return this.storage.set(CRYPTO_KEY,[item]);
    }
  });
}

getFavouriteCrypto():Promise<string[]>{
return this.storage.get(CRYPTO_KEY);
}

deleteFavouriteCrypto(item: string){
  return this.storage.get(CRYPTO_KEY).then((items: string[])=>{
    if(!items || items.length ===0){
      return null;
    }

    let toKeep: string[] = [];

    for(let i of items){
      if(i !== item){
        toKeep.push(i);
      }
    }
    return this.storage.set(CRYPTO_KEY, toKeep)
  });
}


}


