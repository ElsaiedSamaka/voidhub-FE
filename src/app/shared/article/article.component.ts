import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { CommentsService } from 'src/core/services/comments.service';
import { PostsService } from 'src/core/services/posts.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
})
export class ArticleComponent implements OnInit, OnChanges {
  @Input() currentUser: any = null;
  @Input() currentTheme: string = '';
  @Input() article: any = {};
  showFollowingPopOver: boolean = false;
  showCommentInput: boolean = false;
  content: string = '';
  alreadySavedArticle;
  alreadyLovedArticle;
  saveCount: number = 0;
  loveCount: number = 0;
  noOfComments: number = 0;
  constructor(
    private commentsService: CommentsService,
    private postsService: PostsService,
    private dataService: DataService
  ) {}

  ngOnInit() {
    const { loveCount, saveCount, comments } = this.article;
    this.saveCount = saveCount;
    this.loveCount = loveCount;
    this.noOfComments = comments.length;
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.article) {
      console.log('update article');
      // Update the reply value
      this.article = changes.article.currentValue;
    }
  }
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
    let isAnonymous = this.dataService.isAnonymous$.value;
    let comment = {
      content: this.content,
      postId: articleId,
      isAnonymous: isAnonymous,
    };
    this.commentsService.post(comment).subscribe({
      next: () => {
        this.content = '';
      },
      error: (err) => {},
      complete: () => {
        this.noOfComments = this.commentsService.comments$.value.length;
      },
    });
  }
  saveArticle(event: any): void {
    event.stopPropagation();
    const articleId = this.article.id;

    if (!this.articleAlreadyExistOnSaved()) {
      this.postsService.save(articleId).subscribe({
        next: () => {},
        error: () => {},
        complete: () => {
          this.saveCount += 1;
          this.updateArticle(); // Update the article object
        },
      });
    } else {
      this.postsService.unsave(articleId).subscribe({
        next: () => {},
        error: () => {},
        complete: () => {
          this.saveCount -= 1;
          this.updateArticle(); // Update the article object
        },
      });
    }
  }
  updateArticle(): void {
    this.postsService.getById(this.article.id).subscribe({
      next: (updatedArticle: any) => {
        this.article = updatedArticle;
      },
      error: () => {},
    });
  }
  articleAlreadyExistOnSaved(): boolean {
    const alreadySavedArticle = this.article.saved_posts.find(
      (item: any) => item.userId === this.currentUser.id
    );

    return !!alreadySavedArticle;
  }
  favArticle(event: any): void {
    event.stopPropagation();
    let articleId = this.article.id;
    if (!this.articleAlreadyExistOnFaved()) {
      this.postsService.fav(articleId).subscribe({
        next: () => {},
        error: () => {},
        complete: () => {
          this.loveCount += 1;
        },
      });
    } else {
      this.postsService.unfav(articleId).subscribe({
        next: () => {},
        error: () => {},
        complete: () => {
          this.loveCount -= 1;
        },
      });
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
