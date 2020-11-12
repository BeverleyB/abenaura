import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import config from '../config.json';

@Injectable({
  providedIn: 'root'
})
export class DropboxService {
  
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': config.dropbox_token
    })
  };

  constructor(private http: HttpClient) { }
  
  getPictures() {
    const url = "https://api.dropboxapi.com/2/files/list_folder";

    const body = {
      path: "/Pictures",
      recursive: false,
      include_media_info: false,
      include_deleted: false,
      include_has_explicit_shared_members: false,
      include_mounted_folders: true,
      include_non_downloadable_files: true,
    }

     return this.http.post(url, body, this.httpOptions);
    }
    
    getThumbnail(list) {
      const url = "https://content.dropboxapi.com/2/files/get_thumbnail_batch";

      const body = { 
        entries: list.map((entry) => {
          return {
            'path': entry.id,
            'format' : {'.tag': 'jpeg'},
            'size': { '.tag': 'w2048h1536'},
            'mode': { '.tag': 'strict' }
          }
        })
      }

      return this.http.post(url, body, this.httpOptions);
  }
}
