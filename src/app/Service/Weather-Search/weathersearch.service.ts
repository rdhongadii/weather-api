import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeathersearchService {

 
     apiKey = '809758f446864490b4a102255230610';
    private apiUrl = 'https://api.weatherapi.com/v1';
  
    constructor(private http: HttpClient) { }
  
    getCurrentWeather(query: string) {
      const url = `${this.apiUrl}/current.json?key=${this.apiKey}&q=${query}`;
      return this.http.get(url);
    }
    
  
    getForecast(query: string, days: number): Observable<any> {
      const url = `${this.apiUrl}/forecast.json?key=${this.apiKey}&q=${query}&days=${days}`;
      return this.http.get(url);
    }
    }
