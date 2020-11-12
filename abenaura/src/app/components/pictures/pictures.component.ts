import { Component, OnInit } from '@angular/core';
import { DropboxService } from '../../../services/dropbox.service';

@Component({
  selector: 'app-pictures',
  templateUrl: './pictures.component.html',
  styleUrls: ['./pictures.component.less'],
})
export class PicturesComponent implements OnInit {
  public pictures = [];
  public defaultPicture = [
    '../../../assets/img/',
    // récuperer toutes les photos par defautls dans ce dossier
  ]

  constructor(
    private dropbox: DropboxService) {}

  ngOnInit(): void {

    this.dropbox.getPictures().subscribe((value: any) => {

      if (value) {
        this.dropbox.getThumbnail(value.entries).subscribe((element: any) => {
          
          element.entries.forEach(picture => {
            this.pictures.push(picture.thumbnail);
          });
        })
      }
      else {
        // faire en sorte d'envoyer le defaultpicture à la place du picture + foreach dessus dans le html
      }

    });
  }
}
