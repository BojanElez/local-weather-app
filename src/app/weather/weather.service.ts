import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, throwError, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { ICurrentWeather } from '../interfaces.model';
import { map, catchError, retry } from 'rxjs/operators';
import { errorMonitor } from 'events';

export interface ICurrentWeatherData {
  weather: [
    {
      description: string
      icon: string
    }
  ]
  main: {
    temp: number
    humidity: number
  }
  sys: {
    country: string
  }
  dt: number
  name: string
}

export interface IWeatherService {
  getCurrentWeather(city: string, country: string): Observable<ICurrentWeather>
  getCurrentWeatherByCoords(lat, lon): Observable<ICurrentWeather>
}


@Injectable({
  providedIn: 'root'
})
export class WeatherService implements IWeatherService {
  errorMessage = '';
  switcher = false;
  currentWeather = new BehaviorSubject<ICurrentWeather>({
    city: '',
    country: '',
    date: Date.now(),
    image: '',
    temperature: 0,
    description: '',
    humidity: 0
  });

  currentWeatherLoc = new BehaviorSubject<ICurrentWeather>({
    city: '',
    country: '',
    date: Date.now(),
    image: '',
    temperature: 0,
    description: '',
    humidity: 0
  });

  constructor(private http: HttpClient) {

  }

  getCurrentWeatherByCoords(lat, lon): Observable<ICurrentWeather> {
    let uriParams = `lat=${lat}&lon=${lon}`;
    return this.getCurrentWeatherHelper(uriParams);
  }

  getCurrentWeather
    (searchCity: string | number, country?: string): Observable<ICurrentWeather> {
    let uriParams = '';

    if (typeof searchCity === 'string') {
      uriParams = `q=${searchCity}`;
    } else {
      uriParams = `zip=${searchCity}`;
    }
    if (country) {
      uriParams = `${uriParams},${country}`;
    }
    return this.getCurrentWeatherHelper(uriParams);

  }

  private getCurrentWeatherHelper(uriParams: string): Observable<ICurrentWeather> {
    return this.http.get<ICurrentWeatherData>(
      `http://api.openweathermap.org/data/2.5/weather?` +
      `${uriParams}&appid=${environment.appId}`
    ).pipe(map(data => this.transformToICurrentWeather(data)), catchError(error => this.handleError(error)));
  }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred: ', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}` + ` body was: ${error.message}`
      );
    }
    return throwError(error.statusText);
  }

  private transformToICurrentWeather(data: ICurrentWeatherData): ICurrentWeather {
    return {
      city: data.name,
      country: data.sys.country,
      date: data.dt * 1000,
      image: `${environment.baseUrl}openweathermap.org/img/w/${data.weather[0].icon}.png`,
      temperature: this.convertKelvinToCelsius(data.main.temp),
      description: data.weather[0].description,
      humidity: data.main.humidity
    }
  }

  convertKelvinToCelsius(kelvin: number): number {
    if (this.switcher === false) {
      return kelvin - 273.15;
    } else {
      return kelvin;
    }
  }

  changeSwitcher() {
    console.log(this.switcher);
    this.switcher = !this.switcher;
    // return !this.switcher;
  }


}
