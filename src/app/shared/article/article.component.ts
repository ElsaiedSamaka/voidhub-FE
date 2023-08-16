import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
})
export class ArticleComponent implements OnInit {
  showFollowingPopOver: boolean = false;
  constructor() {}

  ngOnInit() {}
  toggleFollowingPopOver() {
    this.showFollowingPopOver = !this.showFollowingPopOver;
    console.log('hover');
  }
  toggleCommentSection() {
    console.log('clicked');
  }
}
