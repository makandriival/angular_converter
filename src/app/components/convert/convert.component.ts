import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { Symbol } from '../../types/SymbolsData';
import { Query } from '../../types/Result';

@Component({
  selector: 'app-convert',
  templateUrl: './convert.component.html',
  styleUrls: ['./convert.component.scss'],
})

export class ConvertComponent implements OnInit {
  symbols: Symbol[] = [];
  form!: FormGroup;
  first!: FormControl;
  second!: FormControl;
  firstSymbol!: FormControl;
  secondSymbol!: FormControl;

  convertionResult: number | null = 0;
  historyRecords: Query[] = [];

  async formSubmit(triger: Event) {
    const trigerInput = triger.target as HTMLInputElement;

    switch (trigerInput.id) {
      case 'first':
        this.dataService.goConvert(
          this.first.value,
          this.firstSymbol.value,
          this.secondSymbol.value,
        )
        .subscribe(data => {
          this.convertionResult = Number((data.result)?.toFixed(2));
          this.second.setValue(this.convertionResult);
          this.addQueryToSessionStorage({
            ...data.query,
            result: this.convertionResult,
          });
        });
        break;
        
      case 'second':
        this.dataService.goConvert(
          this.second.value,
          this.secondSymbol.value,
          this.firstSymbol.value,
        )
        .subscribe(data => {
          this.convertionResult = Number((data.result)?.toFixed(2));
          this.first.setValue(this.convertionResult);
          this.addQueryToSessionStorage({
            ...data.query,
            result: this.convertionResult,
          });
        });
        break;

      default:
        console.error('form input error')
    }
  }

  getQueryFromSessionStorage() {
    const storageItem = sessionStorage.getItem('history');
    this.historyRecords = storageItem ? JSON.parse(storageItem) : [];
  }

  addQueryToSessionStorage(query: Query) {
    this.getQueryFromSessionStorage();
    this.historyRecords.push(query);
    sessionStorage.setItem('history', JSON.stringify(this.historyRecords))
  }

  clearSesionHistory() {
    sessionStorage.setItem('history', '');
    this.getQueryFromSessionStorage();
  }
  
  constructor(
    private dataService: DataService,
    ) {
    this.first = new FormControl('');
    this.second = new FormControl('');
    this.firstSymbol = new FormControl('EUR');
    this.secondSymbol = new FormControl('UAH');

    this.form = new FormGroup({
      first: this.first,
      second: this.second,
      firstSymbol: this.firstSymbol,
      secondSymbol: this.secondSymbol,
    });
  }
  
  ngOnInit() {
    this.dataService.getSymbols().subscribe((data)=>{
      this.symbols = Object.values(data.symbols);
    });
    this.getQueryFromSessionStorage();
  }
}
