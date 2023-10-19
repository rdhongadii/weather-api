import { Component } from '@angular/core';
import { WeathersearchService } from 'src/app/Service/Weather-Search/weathersearch.service';

@Component({
  selector: 'app-weathersearch',
  templateUrl: './weathersearch.component.html',
  styleUrls: ['./weathersearch.component.css']
})
export class WeathersearchComponent {
  query: string = '';
  weatherData: any;
  forecastData: any;
  location: string = '';
  errorMessage: string='';

  constructor(private weathersearchService: WeathersearchService) {}

  searchLocation() {
    this.weathersearchService.getCurrentWeather(this.query).subscribe(
      (data: any) => {
        this.weatherData = data;
        this.errorMessage = '';
      },
      (error) => {
        console.error('Please enter correct country or city name');
        this.errorMessage = 'Please enter correct country or city name';
      }
    );
  
        this.weathersearchService.getForecast(this.query,7)
      .subscribe((data) => {
        this.forecastData = data;
        this.errorMessage = '';

      },
      (error) => {
        console.error('Please enter correct country or city name');
        this.errorMessage = 'Please enter correct country or city name';
      }
      );
    }     
}