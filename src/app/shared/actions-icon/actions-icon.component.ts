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
  showToast: boolean = false;
  toastMessage: string = '';
  toastType: string = '';
  constructor(private postsService: PostsService) {}

  ngOnInit() {}
  handleActions(event: any): void {
    event.stopPropagation();
    this.showActionsDDL = !this.showActionsDDL;
  }
  handlePostRemove(event: any): void {
    event.stopPropagation();
    this.showActionsDDL = false;
    this.postsService.deleteById(this.id).subscribe({
      next: (removedPost) => {},
      error: (err) => {
        console.log('error while removeing post [actions-icon component]', err);
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
  toggleToast() {
    this.showToast = !this.showToast;
    setTimeout(() => {
      this.showToast = false;
    }, 4000);
  }
}
