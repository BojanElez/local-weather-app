import { Component, OnInit } from '@angular/core';
import { NgModel, Validators } from '@angular/forms';
import { WeatherService } from '../weather/weather.service';

@Component({
  selector: 'app-city-search-input',
  templateUrl: './city-search-input.component.html',
  styleUrls: ['./city-search-input.component.css']
})
export class CitySearchInputComponent implements OnInit {
  model = {
    search: ''
  }

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
  }

  doSearch(searchValue) {
    const userInput = searchValue.split(',').map(s => s.trim())
    this.weatherService.getCurrentWeather(
      userInput[0],
      userInput.length > 1 ? userInput[1] : undefined
    ).subscribe(data => (console.log(data)));
  }

}
