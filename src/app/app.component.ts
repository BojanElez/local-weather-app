import { Component, OnInit } from '@angular/core';
import { ICurrentWeather } from './interfaces.model';
import { WeatherService } from './weather/weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  currentStatus: boolean = false;
  errorMessage: string = '';
  currentWeather: ICurrentWeather;
  currentWeatherLoc: ICurrentWeather;

  constructor(private weatherService: WeatherService) {

  }

  ngOnInit() {
    this.getLocation();
  }

  doSearch(searchValue) {
    const userInput = searchValue.split(',').map(s => s.trim())
    this.weatherService.getCurrentWeather(
      userInput[0],
      userInput.length > 1 ? userInput[1] : undefined
    ).subscribe((data) => (this.currentWeather = data), (err) => {
      this.errorMessage = err;
    });

    if (searchValue.length > 0) {
      this.currentStatus = true;
    } else if (searchValue.length <= 2 || this.errorMessage !== '') {
      this.currentStatus = false;
    }
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: Position) => {
        if (position) {
          let lat = position.coords.latitude;
          let lng = position.coords.longitude;
          this.weatherService.getCurrentWeatherByCoords(lat, lng).subscribe(data => {
            this.currentWeatherLoc = data;
          })
        }
      },
        (error: PositionError) => console.log(error));
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  onSwitch() {
    //this.switcher = this.weatherService.changeSwitcher();
  }
}
