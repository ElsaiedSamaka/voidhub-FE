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
  @Input() currentUser: any;
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
        this.content = '';
        this.toggleToast(err.message);
      },
      complete: () => {
        this.content = '';
      },
    });
  }
  handleRemovedComment(removedComment: any): void {
    this.comments = this.commentsService.comments$.value;
  }
  toggleToast(toastMessage: string) {
    this.showToast = !this.showToast;
    this.toastMessage = toastMessage;
    setTimeout(() => {
      this.showToast = false;
    }, 4000);
  }
}
