import {Injectable, NgZone} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {filter, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  public static baseApi = 'http://api.openweathermap.org/data/2.5/forecast';
  private static ApiKey = '6739e08f153f9cea7ecb5b4df13dc9d1';
  private static coordinates: Coordinates;


  constructor(private http: HttpClient, private zone: NgZone) {
    this.getPosition();
  }

  public getWeather(): Observable<any> {
      return this.http.get(`${WeatherService.baseApi}?lat=${WeatherService.coordinates.latitude}&lon=${WeatherService.coordinates.longitude}&appid=${WeatherService.ApiKey}&units=metric`);
  }

  private getPosition(): void { // latitude & longitude
    navigator.geolocation.getCurrentPosition(setPosition);

    function setPosition(position: Position): void {
      WeatherService.coordinates = position.coords;
    }
  }


}
