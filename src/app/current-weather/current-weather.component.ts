import { Component, OnInit } from '@angular/core';
import { ICurrentWeather } from '../interfaces.model';
import { WeatherService } from '../weather/weather.service';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.css']
})
export class CurrentWeatherComponent implements OnInit {
  current: ICurrentWeather;

  constructor(private weatherService: WeatherService) {
    this.current = {
      city: '',
      country: '',
      image: '',
      date: 0,
      temperature: 0,
      description: '',
    }
  }

  ngOnInit() {
    this.weatherService.getCurrentWeather('Paris', 'FR').subscribe(
      (data) => this.current = data)
  }



}
