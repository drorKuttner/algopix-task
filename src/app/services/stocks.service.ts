import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Stock} from '../models/stock';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StocksService {
  public static baseApi = 'https://api.iextrading.com/1.0/tops/last';
  private readonly stocksSubject: BehaviorSubject<Stock[]>;

  constructor(private http: HttpClient) {
    this.stocksSubject = new BehaviorSubject([]);
  }

  public get stocks(): Observable<Stock[]> {
    return this.stocksSubject.asObservable();
  }

  public updateStocks(symbols: string): void {
    const params: HttpParams = new HttpParams().set('symbols', symbols);
    this.http.get(StocksService.baseApi, {params}).subscribe((stocks: Stock[]) => {
      this.stocksSubject.next(stocks);
    });
  }

  public deleteStock(timestamp: number): void {
    const stocks = this.stocksSubject.getValue();
    const stockToDelete: Stock = stocks.find((stock: Stock) => stock.time === timestamp);
    stocks.splice(stocks.indexOf(stockToDelete, 1));
    this.stocksSubject.next(stocks);
  }
}
