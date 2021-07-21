import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HttpService {

  constructor(private http: HttpClient) {}

  sendEmail(url, data) {
    return this.http.post(url, data);
  }

  getInstagram() {
    return this.http.get('https://www.instagram.com/abenaura_toulouse/?__a=1');
  }

  // En attente retour uber, pas utile pour l'instant.
  getMenu() {
    return this.http.get('https://api.uber.com/v1/eats/stores/z3dUluRiTjmKSS4H8Vr9sQ');
  }
}
