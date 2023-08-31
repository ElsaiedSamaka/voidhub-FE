import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { PostsService } from 'src/core/services/posts.service';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css'],
})
export class TimelineComponent implements OnInit, AfterViewInit {
  @Input() currentTheme: string = '';
  @Input() currentUser: any = null;

  posts: any[] = [];
  constructor(private postsService: PostsService) {}

  ngOnInit() {
    this.getAll();
    this.subscribeToPosts$();
  }
  ngAfterViewInit() {
    this.addScrollListener();
  }
  addScrollListener(): void {
    window.addEventListener('scroll', this.scrollHandler.bind(this), true);
  }
  scrollHandler(event: Event): void {
    const windowScrollTop =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;
    const windowHeight =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight ||
      0;
    const documentHeight = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight,
      document.body.clientHeight,
      document.documentElement.clientHeight
    );

    if (windowScrollTop + windowHeight >= documentHeight) {
      // Reached the bottom of the page, fetch more posts
      this.fetchMorePosts();
    }
  }

  fetchMorePosts(): void {
    this.postsService.getMorePosts().subscribe();
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
