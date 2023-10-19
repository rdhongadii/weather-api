import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocationService } from 'src/app/Service/User Location/ForeCastLocation.service';
import { WeatherService } from 'src/app/Service/User Location/weather.service';


@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {
  weatherData: any;
  errorMessage: string = '';
  forecastData: any;
  errorLocationMessage: string ='';
  errorFetchMessage: string='';
  constructor( private route: ActivatedRoute,private router: Router,private weatherService: WeatherService, private locationService:LocationService) {}

  ngOnInit(): void {
    
    this.getLocation();
    this.route.queryParams.subscribe((params) => {
      const lat = params?.['lat']; // Use optional chaining
      const lon = params?.['lon']; // Use optional chaining
      
      if (lat && lon) {
        this.getWeatherByLocation(lat, lon);
        this.getLocationAndFetchForecast(lat,lon);
      }
    });
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        this.router.navigate(['/weather'], { queryParams: { lat, lon } });
      },
      (error) => {
        this.errorMessage = 'User blocked location detector.Please allow the location detector from settings';
        console.error(error);
      }
    );
  } else {
    this.errorMessage = 'Geolocation is not supported by your browser.';
  
    }
  }
  getWeatherByLocation(lat: number, lon: number) {
    this.weatherService.getWeatherByLocation(lat, lon).subscribe(
      (data) => {
        this.weatherData = data;
      },
      (error) => {
        this.errorLocationMessage = 'User blocked location detector.Please allow the location detector from settings';
        console.error(error);
      }
    );
  }
  getLocationAndFetchForecast(lat:number,lon:number) {
  
          this.locationService
            .getForecastByLocation(lat, lon)
            .subscribe(
              (data) => {
                this.forecastData = data;
              },
              (error) => {
                this.errorFetchMessage = 'User blocked location detector.Please allow the location detector from settings';
                console.error(error);
              }
            );
}
}