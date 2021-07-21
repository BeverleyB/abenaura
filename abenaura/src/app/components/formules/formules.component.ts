import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/services/http.service';

@Component({
  selector: 'app-formules',
  templateUrl: './formules.component.html',
  styleUrls: ['./formules.component.less']
})
export class FormulesComponent implements OnInit {

  constructor(private _http: HttpService) { }

  ngOnInit(): void {
    // this.getMenuItem();
  }

  // En attente retour uber
  getMenuItem() {
    this._http.getMenu().subscribe(value => {
      console.log(value);
    })
  }
}
