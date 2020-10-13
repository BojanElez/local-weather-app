import { Component, Input, OnInit } from '@angular/core';
import { errorMonitor } from 'events';
import { AppModule } from '../app.module';
import { ICurrentWeather } from '../interfaces.model';
import { WeatherService } from '../weather/weather.service';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.css']
})
export class CurrentWeatherComponent implements OnInit {
  @Input() current: ICurrentWeather;
  @Input() currentLoc: ICurrentWeather;
  @Input() currentStatus: boolean;
  @Input() errorMessage: string;

  constructor(private weatherService: WeatherService) {

  }

  ngOnInit() {
    this.weatherService.currentWeather.subscribe(data => {
      (this.current = data)
    })
  }


}
