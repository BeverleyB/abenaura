import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/services/http.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.less']
})
export class NewsComponent implements OnInit {
  public instaFollowers: number;

  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
    this.httpService.getInstagram().subscribe((value: any) => {
      this.instaFollowers = value.graphql.user.edge_followed_by.count;
    })
  }
}
