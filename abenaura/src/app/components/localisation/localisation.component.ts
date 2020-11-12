import { Component } from '@angular/core';

@Component({
  selector: 'app-localisation',
  templateUrl: './localisation.component.html',
  styleUrls: ['./localisation.component.less'],
})
export class LocalisationComponent {
  lat: number = 43.6105756;
  lng: number = 1.4389938;
  zoom: number = 16;

  constructor() {}
}
