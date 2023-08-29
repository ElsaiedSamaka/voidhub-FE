import { Component, Input, OnInit } from '@angular/core';
import { PostsService } from 'src/core/services/posts.service';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css'],
})
export class TimelineComponent implements OnInit {
  @Input() currentTheme: string = '';
  @Input() currentUser: any = null;

  posts: any[] = [];
  constructor(private postsService: PostsService) {}

  ngOnInit() {
    this.getAll();
    this.subscribeToPosts$();
  }
  getAll(): void {
    this.postsService.getAll().subscribe({
      next: (response) => {
        this.posts = this.postsService.posts$.value;
      },
      error: (err) => {
        console.log('err on [getAll] TimelineComponent', err);
      },
      complete: () => {},
    });
  }
  subscribeToPosts$(): void {
    this.postsService.posts$.subscribe({
      next: (response) => {
        this.posts = response;
      },
      error: (error) => {
        console.log(
          'error while reterieving posts [timeline component]',
          error
        );
      },
      complete: () => {},
    });
  }
}
