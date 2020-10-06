import { of } from 'rxjs';
import { ICurrentWeather } from '../interfaces.model';
import { IWeatherService } from './weather.service';

export class WeatherServiceFake implements IWeatherService {
    private fakeWeather: ICurrentWeather = {
        city: 'Bursa',
        country: 'TR',
        image: '',
        temperature: 287,
        description: 'light intesity drizzle',
    }
    public getCurrentWeather(city: string, country: string) {
        return of(this.fakeWeather);
    }
}