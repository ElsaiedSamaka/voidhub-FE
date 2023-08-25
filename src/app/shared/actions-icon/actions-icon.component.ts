import { Component, Input, OnInit } from '@angular/core';
import { PostsService } from 'src/core/services/posts.service';

@Component({
  selector: 'app-actions-icon',
  templateUrl: './actions-icon.component.html',
  styleUrls: ['./actions-icon.component.css'],
})
export class ActionsIconComponent implements OnInit {
  @Input() id: string = '';
  showActionsDDL: boolean = false;
  constructor(private postsService: PostsService) {}

  ngOnInit() {}
  handleActions(event: any): void {
    event.stopPropagation();
    this.showActionsDDL = !this.showActionsDDL;
    console.log('clicked');
  }
  handlePostRemove(event: any): void {
    event.stopPropagation();
    this.showActionsDDL = false;
    this.postsService.deleteById(this.id).subscribe({
      next: (removedPost) => {
        console.log('removedPost', removedPost);
      },
      error: (err) => {
        console.log('error while removeing post', err);
      },
      complete: () => {},
    });
    console.log('handlePostRemove');
  }
  handlePostReport(event: any): void {
    event.stopPropagation();
    this.showActionsDDL = false;
    console.log('handlePostReport');
  }
}
