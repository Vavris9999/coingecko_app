import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CoinDetail } from 'src/app/models/coin.model';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-coin-detail',
  templateUrl: './coin-detail.page.html',
  styleUrls: ['./coin-detail.page.scss'],
})
export class CoinDetailPage implements OnInit {
  coin$ : Observable<CoinDetail[]>;
  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute
    ) {
      const id = this.route.snapshot.paramMap.get("id");
      this.coin$ = this.apiService.getCoin$(id) 
     }

  ngOnInit() {
  }

}
