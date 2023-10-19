import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { LocationComponent } from './Component/location/location.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WeathersearchComponent } from './Component/weather-search/weathersearch.component';
import { HomeComponent } from './Component/home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    LocationComponent,
    WeathersearchComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
