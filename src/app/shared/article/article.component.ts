import { Component, Input, OnInit } from '@angular/core';
import { CommentsService } from 'src/core/services/comments.service';
import { PostsService } from 'src/core/services/posts.service';

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
  constructor(
    private commentsService: CommentsService,
    private postsService: PostsService
  ) {}

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
    let articleId = this.article.id;
    let comment = { content: this.content, postId: articleId };
    this.commentsService
      .post(comment)
      .subscribe({ next: () => {}, error: (err) => {}, complete: () => {} });
  }
  saveArticle(): void {
    let articleId = this.article.id;
    this.postsService
      .save(articleId)
      .subscribe({ next: () => {}, error: () => {}, complete: () => {} });
  }
}
