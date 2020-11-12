import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LocalisationComponent } from './components/localisation/localisation.component';
import { PicturesComponent } from './components/pictures/pictures.component';
import { ContactComponent } from './components/contact/contact.component';

import { HttpService } from '../services/http.service';
import { NewsComponent } from './components/news/news.component';
import { FormulesComponent } from './components/formules/formules.component';

@NgModule({
  declarations: [
    AppComponent,
    LocalisationComponent,
    PicturesComponent,
    ContactComponent,
    NewsComponent,
    FormulesComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC1jtKqOZitlvKh8yOZc4ByFAbVfEySYKo',
    }),
  ],
  providers: [HttpService],
  bootstrap: [AppComponent],
})
export class AppModule {}
