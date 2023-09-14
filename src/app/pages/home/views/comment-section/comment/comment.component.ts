import { Component, Input, OnInit } from '@angular/core';
import { CommentsService } from 'src/core/services/comments.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
})
export class CommentComponent implements OnInit {
  @Input() currentTheme: string = '';
  @Input() comment: any;
  showFollowingPopOver: boolean = false;
  showActionsDDL: boolean = false;

  constructor(private commentsService: CommentsService) {}

  ngOnInit() {}
  toggleFollowingPopOver() {
    this.showFollowingPopOver = !this.showFollowingPopOver;
  }
  handleActions(event: any): void {
    event.stopPropagation();
    this.showActionsDDL = !this.showActionsDDL;
  }
  handlePostRemove(event: any): void {
    event.stopPropagation();
    this.showActionsDDL = false;
    this.commentsService.deleteById(this.comment.id).subscribe({
      next: (removedComment) => {},
      error: (err) => {
        console.log(
          'error while removeing comment [actions-icon component]',
          err
        );
      },
      complete: () => {},
    });
  }
  handlePostReport(event: any): void {
    event.stopPropagation();
    this.showActionsDDL = false;
    console.log('handlePostReport');
  }
}
