import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WeatherService } from '../weather/weather.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CurrentWeatherComponent } from './current-weather.component';
import { WeatherServiceFake } from '../weather/weather.service.fake';

describe('CurrentWeatherComponent', () => {
  let component: CurrentWeatherComponent;
  let fixture: ComponentFixture<CurrentWeatherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CurrentWeatherComponent],
      providers: [{ provide: WeatherService, useClass: WeatherServiceFake }]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentWeatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});