import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { WeatherService } from './weather.service';

describe('WeatherService', () => {
  let service: WeatherService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [WeatherService],
    });
    service = TestBed.inject(WeatherService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve weather data by location', () => {
    const lat = 123; 
    const lon = 456; 
    const mockData = {
        coord: {
          lon: 123.45,
          lat: 67.89,
        },
        weather: [
          {
            id: 800,
            main: 'Clear',
            description: 'clear sky',
            icon: '01d',
          },
        ],
        base: 'stations',
        main: {
          temp: 25.6,
          feels_like: 26.7,
          temp_min: 24.3,
          temp_max: 26.8,
          humidity: 60,
        },
        visibility: 10000,
        wind: {
          speed: 4.5,
          deg: 180,
        },
        clouds: {
          all: 0,
        },
        dt: 1634382000,
        sys: {
          type: 2,
          id: 2032954,
          country: 'US',
          sunrise: 1634350281,
          sunset: 1634391423,
        },
        timezone: -25200,
        id: 123456,
        name: 'Test City',
        cod: 200,
      };
      

    service.getWeatherByLocation(lat, lon).subscribe((data) => {
      expect(data).toEqual(mockData);
    });

    const expectedUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${service['apiKey']}&units=metric`;
    const req = httpMock.expectOne(expectedUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
});

});
