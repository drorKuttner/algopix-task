import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {debounceTime, filter} from 'rxjs/operators';
import {StocksService} from './services/stocks.service';
import {Subscription} from 'rxjs';
import {Stock} from './models/stock';
import {DataSource} from '@angular/cdk/collections';
import {StockDataSource} from './models/stockDataSource';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  public searchForm: FormControl;
  public stocks: any;
  public displayedColumns: string[] = ['symbol', 'size', 'price', 'time', 'actions'];


  private searchSubscription: Subscription;
  private stocksSubscription: Subscription;

  constructor(private stockService: StocksService) {
    this.searchForm = new FormControl('');
  }

  public ngOnInit(): void {

    this.searchSubscription = this.searchForm.valueChanges.pipe(
      debounceTime(750),
      filter((query: string) => !!query)
    ).subscribe(
      (searchQuery: string) => {
        this.stockService.updateStocks(searchQuery);
      }
    );

    this.stocksSubscription = this.stockService.stocks.subscribe((stocks: Stock[]) => {
      this.stocks = new StockDataSource(stocks);
    });
  }

  public ngOnDestroy(): void {
    this.searchSubscription.unsubscribe();
    this.stocksSubscription.unsubscribe();
  }

  public deleteStock(stock: Stock): void {
    this.stockService.deleteStock(stock.time);
  }
}
