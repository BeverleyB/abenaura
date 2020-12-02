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
    '../../../assets/img/food.jpg',
    '../../../assets/img/food1.jpg',
    '../../../assets/img/food2.jpg',
    '../../../assets/img/food3.jpg',
    '../../../assets/img/food4.jpg',
    '../../../assets/img/food5.jpg',
    '../../../assets/img/food6.jpg',
    '../../../assets/img/food7.jpg'
  ]

  constructor(
    private dropbox: DropboxService) {}

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
