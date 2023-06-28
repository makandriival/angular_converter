import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Rate } from 'src/app/types/RatesData';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  usdRate = 0;
  eurRate = 0;

  rates: Rate[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getRates()
    .subscribe(data => {
      const ratesFromApi = data.rates;
      
      for (let rateKey of Object.keys(ratesFromApi)) {
        const rateCode = rateKey;
        const rateValue = (1 / ratesFromApi[rateKey]).toFixed(2);

        this.rates.push({
          code: rateCode,
          rate: Number(rateValue),
        })
      }

    })
  }

}
