import { TestBed, ComponentFixture, tick, fakeAsync } from '@angular/core/testing';
import { WeathersearchComponent } from './weathersearch.component';
import { WeathersearchService } from 'src/app/Service/Weather-Search/weathersearch.service';
import { of, throwError } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AngularFireAuth } from '@angular/fire/compat/auth';

class MockAngularFireAuth {
  signOut(): Promise<void> {
    return Promise.resolve();
  }
}

describe('WeathersearchComponent', () => {
  let fixture: ComponentFixture<WeathersearchComponent>;
  let component: WeathersearchComponent;
  let weathersearchService: WeathersearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WeathersearchComponent],
      providers: [WeathersearchService,
        {
          provide: AngularFireAuth,
          useClass: MockAngularFireAuth,
        },
      ],
      imports: [HttpClientTestingModule],
    });

    fixture = TestBed.createComponent(WeathersearchComponent);
    component = fixture.componentInstance;
    weathersearchService = TestBed.inject(WeathersearchService);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve weather data and forecast data', fakeAsync(() => {
    const mockWeatherData = {
      temperature: 25,
      condition: 'Sunny',
    };

    const mockForecastData = {
      dailyForecast: [
        {
          date: '2023-10-15',
          temperature: {
            max: 28,
            min: 18,
          },
          condition: 'Sunny',
        },
        {
          date: '2023-10-16',
          temperature: {
            max: 26,
            min: 17,
          },
          condition: 'Partly Cloudy',
        },
        // Add more forecast data as needed
      ],
    };

    spyOn(weathersearchService, 'getCurrentWeather').and.returnValue(of(mockWeatherData));
    spyOn(weathersearchService, 'getForecast').and.returnValue(of(mockForecastData));

    component.query = '';
    component.searchLocation();
    tick();
    expect(component.weatherData).toEqual(mockWeatherData);
    expect(component.forecastData).toEqual(mockForecastData);
  }))

  it('should handle errors during data fetching', fakeAsync(() => {
    spyOn(weathersearchService, 'getCurrentWeather').and.returnValue(throwError('Weather error'));
    spyOn(weathersearchService, 'getForecast').and.returnValue(throwError('Forecast error'));

    component.query = ''; 
    component.searchLocation();
    tick();
    expect(component.weatherData).toBeUndefined(); 
    expect(component.forecastData).toBeUndefined(); 
    expect(component.location).toEqual('Banglore');
  }));
});
