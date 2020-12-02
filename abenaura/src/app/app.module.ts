import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LocalisationComponent } from './components/localisation/localisation.component';
import { PicturesComponent } from './components/pictures/pictures.component';
import { ContactComponent } from './components/contact/contact.component';
import { PresentationComponent } from './components/presentation/presentation.component';
import { FormulesComponent } from './components/formules/formules.component';

import { HttpService } from '../services/http.service';

import config from '../config.json';
import { AppRoutingModule } from './app-routing.module';
import { Redirect404Component } from './components/redirect404/redirect404.component';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    LocalisationComponent,
    PicturesComponent,
    ContactComponent,
    PresentationComponent,
    FormulesComponent,
    Redirect404Component,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: config.gmap,
    }),
    AppRoutingModule,
  ],
  providers: [HttpService],
  bootstrap: [AppComponent],
})
export class AppModule {}
