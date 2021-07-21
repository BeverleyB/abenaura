import { Component, OnInit } from '@angular/core';
import { DropboxService } from '../../../services/dropbox.service';

@Component({
  selector: 'app-pictures',
  templateUrl: './pictures.component.html',
  styleUrls: ['./pictures.component.less'],
})
export class PicturesComponent implements OnInit {
  public pictures = [];
  public defaultPictures = [
   'food.jpg',
   'food1.jpg',
   'food2.jpg',
   'food3.jpg',
   'food4.jpg',
   'food5.jpg',
   'food6.jpg',
   'food7.jpg',
   'food8.jpg',
   'food9.jpg',
   'food10.jpg',
   'food11.jpg',
   'food12.jpg',
   'food13.jpg'
  ]

  constructor(private dropbox: DropboxService) {}

  ngOnInit(): void {

    this.displayPictures();
  }

  displayPictures() {
    this.dropbox.getPictures().subscribe((value: any) => {

      if (value) {
        this.dropbox.getThumbnail(value.entries).subscribe((element: any) => {

          if (element) {
            element.entries.forEach(picture => {
              this.pictures.push(picture.thumbnail);
            });
          }
        })
      }
      else {
        throw new Error('Problème récuperation dropbox');
      }
    });


  }
}
