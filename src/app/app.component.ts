import {Component, OnDestroy, OnInit} from '@angular/core';
import {WeatherService} from './services/weather.service';
import {Weather} from './models/weather.model';
import {ChartDataItem} from './models/chart-data-item.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  public isLoading = true;
  public temperatureChartData: ChartDataItem[];
  public humidityChartData: ChartDataItem[];
  public city: any;

  private weatherSubscription: Subscription;

  constructor(private weatherService: WeatherService) {}

  public ngOnInit(): void {
      setTimeout(() => {
       this.weatherSubscription = this.weatherService.getWeather().subscribe((weatherData: Weather) => {
           this.isLoading = false;
           this.city = weatherData.city;
           this.temperatureChartData = weatherData.list.filter((weatherItem: any, index: number) => {
             return index % 10 === 0;
           })
             .map((weatherItem: any) => {
             return {
               name: new Date(weatherItem.dt_txt).toString().substring(0, 10),
               value: weatherItem.main.temp
             };
           });

           this.humidityChartData = weatherData.list.filter((weatherItem: any, index: number) => {
             return index % 10 === 0;
           })
             .map((weatherItem: any) => {
             return {
               name: new Date(weatherItem.dt_txt).toString().substring(0, 10),
               value: weatherItem.main.humidity
             };
           });


        });
      }, 5000);
  }

  public ngOnDestroy(): void {
    if (!!this.weatherSubscription) {
      this.weatherSubscription.unsubscribe();
    }
  }
}
