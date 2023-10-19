import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { LocationComponent } from './location.component';
import { WeatherService } from 'src/app/Service/User Location/weather.service';
import { LocationService } from 'src/app/Service/User Location/ForeCastLocation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/compat/auth';


class MockAngularFireAuth {
  signOut(): Promise<void> {
    return Promise.resolve();
  }
}

describe('LocationComponent', () => {
  let component: LocationComponent;
  let fixture: ComponentFixture<LocationComponent>;
  let weatherService: WeatherService;
  let locationService: LocationService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LocationComponent],
      providers: [
        WeatherService,
        LocationService,
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of({ lat: 123, lon: 456 }),
          },
        },
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate'),
          },
        },
        {
          provide: AngularFireAuth,
          useClass: MockAngularFireAuth,
        },
      ],
      imports: [HttpClientModule], 
    });

    fixture = TestBed.createComponent(LocationComponent);
    component = fixture.componentInstance;
    weatherService = TestBed.inject(WeatherService);
    locationService = TestBed.inject(LocationService);
    router = TestBed.inject(Router);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch weather and forecast data by location', fakeAsync(() => {
    const mockedWeatherData = {
      temperature: 25,
      weatherdescription:'broken clouds'
    };
    const mockedForecastData = {
      dailyForecast: [
        {
          date: '2023-10-13 15:00:00',
          temperature: 26.94,
          Condition: 'broken clouds',
          },
      ],
    };
    spyOn(weatherService, 'getWeatherByLocation').and.returnValue(of(mockedWeatherData));
    spyOn(locationService, 'getForecastByLocation').and.returnValue(of(mockedForecastData));
  
    component.ngOnInit();
    tick(); 
    expect(weatherService.getWeatherByLocation).toHaveBeenCalledWith(123, 456);
    expect(locationService.getForecastByLocation).toHaveBeenCalledWith(123, 456);
  }));

  it('should handle errors during data fetching', fakeAsync(() => {
    spyOn(weatherService, 'getWeatherByLocation').and.returnValue(throwError('Weather error'));
    spyOn(locationService, 'getForecastByLocation').and.returnValue(throwError('Forecast error'));

    component.ngOnInit();
    tick(); 
    expect(component.errorMessage).toContain('Error fetching');

  }))

  it('should navigate with geolocation data', fakeAsync(() => {
    spyOn(navigator.geolocation, 'getCurrentPosition').and.callFake((successCallback) => {
      const position = { coords: { latitude: 12.34, longitude: 56.78 } }as any;
      successCallback(position);
    });

    component.getLocation();
    tick();
    expect(router.navigate).toHaveBeenCalledWith(['/weather'], { queryParams: { lat: 12.34, lon: 56.78 } });

  }))
  

  it('should handle geolocation not supported', () => {
    component.errorMessage = '';
  
    const mockGeolocation = {
      getCurrentPosition: (successCallback: PositionCallback, errorCallback: PositionErrorCallback) => {
        const error = {
          code: 3, 
          message: 'Geolocation is not supported by your browser.',
        };
        errorCallback(error as GeolocationPositionError);
      },
    } as any;
  
    spyOnProperty(navigator, 'geolocation').and.returnValue(mockGeolocation);
  
    component.getLocation();
  
    expect(component.errorMessage).toBe('Geolocation is not supported by your browser.');
  });
});
