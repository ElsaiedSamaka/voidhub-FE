import { Component, Input, OnInit } from '@angular/core';
import { CommentsService } from 'src/core/services/comments.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
})
export class ArticleComponent implements OnInit {
  @Input() currentUser: any = null;
  @Input() currentTheme: string = '';
  @Input() article: any = {};
  showFollowingPopOver: boolean = false;
  showCommentInput: boolean = false;
  content: string = '';
  constructor(private commentsService: CommentsService) {}

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
  postComment(event: any): void {
    event.stopPropagation();
    let comment = { content: this.content, postId: this.article.id };
    this.commentsService
      .post(comment)
      .subscribe({ next: () => {}, error: (err) => {}, complete: () => {} });
  }
}
