import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
 
  private apiKey = '7cfc7aa1e9a7992ae745363e9f342848';
  private apiUrl = 'https://api.openweathermap.org/data/2.5/forecast';

  constructor(private http: HttpClient) {}

  getForecastByLocation(lat: number, lon: number): Observable<any> {
    const params = {
      lat: lat.toString(),
      lon: lon.toString(),
      appid: this.apiKey,
      units: 'metric', 
    };

    return this.http.get<any>(this.apiUrl, { params });
  }
}
