import {DataSource} from '@angular/cdk/collections';
import {Stock} from './stock';
import {Observable, of} from 'rxjs';

export class StockDataSource extends DataSource<Stock>{
  constructor(private stocks) {
    super();
  }

  public connect(): Observable<any> {
    return of(this.stocks);
  }

  public disconnect(): void {
    // No-op
  }
}
