import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
})
export class ArticleComponent implements OnInit {
  @Input() currentTheme: string = '';
  @Input() article: any = {};
  showFollowingPopOver: boolean = false;
  showCommentInput: boolean = false;
  constructor() {}

  ngOnInit() {}
  toggleFollowingPopOver() {
    this.showFollowingPopOver = !this.showFollowingPopOver;
  }
  toggleCommentSection(event: any) {
    event.stopPropagation();
    this.showCommentInput = !this.showCommentInput;
  }
  handleArticleActions(event: any): void {
    event.stopPropagation();
    console.log('clicked');
  }
  handleCommentInput(event: any): void {
    event.stopPropagation();
  }
}
