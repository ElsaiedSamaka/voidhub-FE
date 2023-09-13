import { Component, Input, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/services/data.service';
import { CommentsService } from 'src/core/services/comments.service';

@Component({
  selector: 'app-comment-section',
  templateUrl: './comment-section.component.html',
  styleUrls: ['./comment-section.component.css'],
})
export class CommentSectionComponent implements OnInit {
  @Input() currentTheme: string = '';
  @Input() article: any;
  comments: any[] = [];
  content: string = '';
  showToast: boolean = false;
  toastMessage: string = '';
  constructor(
    private commentsService: CommentsService,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.getAll();
  }
  getAll(): void {
    let articleId = this.article.id;
    this.commentsService.getAll(articleId).subscribe({
      next: (comments) => {
        this.comments = comments;
      },
      error: (err) => {
        console.log('err', err);
      },
      complete: () => {},
    });
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
      error: (err) => {
        this.showToast = true;
        this.toastMessage = err.message;
      },
      complete: () => {
        // this.noOfComments = this.commentsService.comments$.value.length;
      },
    });
  }
  // saveArticle(event: any): void {
  //   event.stopPropagation();
  //   let articleId = this.article.id;
  //   if (!this.articleAlreadyExistOnSaved()) {
  //     this.postsService.save(articleId).subscribe({
  //       next: () => {},
  //       error: () => {},
  //       complete: () => {
  //         this.saveCount += 1;
  //       },
  //     });
  //   } else {
  //     this.postsService.unsave(articleId).subscribe({
  //       next: () => {},
  //       error: () => {},
  //       complete: () => {
  //         this.saveCount -= 1;
  //       },
  //     });
  //   }
  // }
  // articleAlreadyExistOnSaved(): boolean {
  //   this.alreadySavedArticle = this.postsService.savedPosts$.value.find(
  //     (item) => item.postId == this.article.id
  //   );
  //   if (this.alreadySavedArticle) return true;
  //   return false;
  // }
  toggleToast() {
    this.showToast = !this.showToast;
    setTimeout(() => {
      this.showToast = false;
    }, 4000);
  }
}
