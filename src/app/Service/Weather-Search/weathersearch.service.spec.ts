import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { WeathersearchService } from './weathersearch.service';

describe('WeathersearchService', () => {
  let service: WeathersearchService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [WeathersearchService],
    });

    service = TestBed.inject(WeathersearchService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve weather data by location', () => {
    const mockWeatherData = {
      location: { name: 'MockLocation', country: 'MockCountry' },
      current: { temp_c: 25, condition: { text: 'Sunny' }, humidity: 60 },
    };

    const query = 'MockLocation';
    service.getCurrentWeather(query).subscribe((data) => {
      expect(data).toEqual(mockWeatherData);
    });

    const req = httpTestingController.expectOne((request) =>
      request.url.includes(`/current.json?key=${service.apiKey}&q=${query}`)
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockWeatherData);
  });

  it('should retrieve forecast data by location and days', () => {
    const mockForecastData = {
    };

    const query = 'MockLocation';
    const days = 7;
    service.getForecast(query, days).subscribe((data) => {
      expect(data).toEqual(mockForecastData);
    });

    const req = httpTestingController.expectOne((request) =>
      request.url.includes(`/forecast.json?key=${service.apiKey}&q=${query}&days=${days}`)
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockForecastData);
  });
});
