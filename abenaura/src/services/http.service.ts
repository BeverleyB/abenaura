import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
}
