import { Component, Input, OnInit } from '@angular/core';
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
  constructor(private commentsService: CommentsService) {}

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
}
