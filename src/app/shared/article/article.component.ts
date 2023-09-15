import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { CommentsService } from 'src/core/services/comments.service';
import { PostsService } from 'src/core/services/posts.service';
import { UsersService } from 'src/core/services/users.service';
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
    private dataService: DataService,
    private usersService: UsersService
  ) {}

  ngOnInit() {
    const { loveCount, saveCount, comments } = this.article;
    this.saveCount = saveCount;
    this.loveCount = loveCount;
    this.noOfComments = comments.length;
    // check if current already follow the creator of the article
    this.isFollowing();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.article && changes.article.currentValue) {
      // Update the reply value
      this.article = changes.article.currentValue;
    }
  }
  displayFollowingPopOver() {
    this.showFollowingPopOver = true;
  }
  hideFollowingPopOver() {
    this.showFollowingPopOver = false;
  }
  toggleCommentSection(event: any) {
    event.stopPropagation();
    this.showCommentInput = !this.showCommentInput;
  }
  handleArticleActions(event: any): void {
    event.stopPropagation();
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
    const articleId = this.article.id;

    if (!this.articleAlreadyExistOnFaved()) {
      this.postsService.fav(articleId).subscribe({
        next: () => {},
        error: () => {},
        complete: () => {
          this.loveCount += 1;
          this.updateArticle(); // Update the article object
        },
      });
    } else {
      this.postsService.unfav(articleId).subscribe({
        next: () => {},
        error: () => {},
        complete: () => {
          this.loveCount -= 1;
          this.updateArticle(); // Update the article object
        },
      });
    }
  }

  articleAlreadyExistOnFaved(): boolean {
    const alreadyLovedArticle = this.article.loved_posts.find(
      (item: any) => item.userId === this.currentUser.id
    );

    return !!alreadyLovedArticle;
  }
  follow(event: any, followingId: any): void {
    event.stopPropagation();
    let followerId = this.currentUser.id;
    const userToFollow = {
      followerId: followerId,
      followingId: followingId,
    };
    this.usersService
      .follow(userToFollow)
      .subscribe({ next: () => {}, error: () => {}, complete: () => {} });
  }
  unfollow(event: any, followingId: any): void {
    event.stopPropagation();
    let followerId = this.currentUser.id;
    const userToUnFollow = {
      followerId: followerId,
      followingId: followingId,
    };
    this.usersService
      .unfollow(userToUnFollow)
      .subscribe({ next: () => {}, error: () => {}, complete: () => {} });
  }
  isFollowing(): boolean {
    const currentUserID = this.currentUser.id;
    const followingUsers = this.article.user.following.map(
      (item) => item.followerId
    );
    return followingUsers.includes(currentUserID);
  }
}
