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
  alreadySavedArticle;
  alreadyLovedArticle;
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
  saveArticle(event: any): void {
    event.stopPropagation();
    let articleId = this.article.id;
    if (!this.articleAlreadyExistOnSaved()) {
      this.postsService
        .save(articleId)
        .subscribe({ next: () => {}, error: () => {}, complete: () => {} });
    } else {
      this.postsService
        .unsave(articleId)
        .subscribe({ next: () => {}, error: () => {}, complete: () => {} });
    }
  }
  articleAlreadyExistOnSaved(): boolean {
    this.alreadySavedArticle = this.postsService.savedPosts$.value.find(
      (item) => item.postId == this.article.id
    );
    if (this.alreadySavedArticle) return true;
    return false;
  }
  favArticle(event: any): void {
    event.stopPropagation();
    let articleId = this.article.id;
    if (!this.articleAlreadyExistOnFaved()) {
      this.postsService
        .fav(articleId)
        .subscribe({ next: () => {}, error: () => {}, complete: () => {} });
    } else {
      this.postsService
        .unfav(articleId)
        .subscribe({ next: () => {}, error: () => {}, complete: () => {} });
    }
  }
  articleAlreadyExistOnFaved(): boolean {
    this.alreadyLovedArticle = this.postsService.lovedPosts$.value.find(
      (item) => item.postId == this.article.id
    );
    if (this.alreadyLovedArticle) return true;
    return false;
  }
}
