import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { WeatherService } from '../weather/weather.service';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-city-search',
  templateUrl: './city-search.component.html',
  styleUrls: ['./city-search.component.css']
})
export class CitySearchComponent implements OnInit {
  search = new FormControl('', [Validators.minLength(2)]);
  @Output() searchEvent = new EventEmitter<string>();

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.search.valueChanges.pipe(debounceTime(1000)).subscribe((searchValue: string) => {
      if (!this.search.invalid) {
        this.searchEvent.emit(searchValue);
      } else {
        this.getErrorMessage();
      }
    });
  }

  getErrorMessage() {
    return this.search.hasError('minLength') ? 'Type more than on character to search' : '';
  }

}
