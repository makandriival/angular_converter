import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { SymbolsData } from '../types/SymbolsData';
import { ConversionResult } from '../types/Result'; 
import { RatesData } from '../types/RatesData';

@Injectable({
  providedIn: 'root'
})

export class DataService {
  apiUrlBase = 'https://api.exchangerate.host/';
  apiUrlSymbols = `${this.apiUrlBase}symbols`;
  apiUrlRates = `${this.apiUrlBase}latest?base=uah&symbols=USD,EUR,PLN,CZK`

  
  constructor(private _http: HttpClient ) { }

  getRates(): Observable<RatesData> {
    return this._http.get<RatesData>(this.apiUrlRates);
  }
  
  getSymbols(): Observable<SymbolsData> {
    return this._http.get<SymbolsData>(this.apiUrlSymbols);
  }
  
  goConvert(
    amount: number,
    from: string,
    to:string
    ) : Observable<ConversionResult> {
    let apiUrlConvert = `${this.apiUrlBase}convert?amount=${amount}&from=${from}&to=${to}`;

    return this._http.get<ConversionResult>(apiUrlConvert)
      .pipe(
        map(data => data)
      );
  }
}
