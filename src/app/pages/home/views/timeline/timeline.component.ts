import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { PostsService } from 'src/core/services/posts.service';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css'],
})
export class TimelineComponent implements OnInit, AfterViewInit {
  @Input() currentTheme: string = '';
  @Input() currentUser: any = null;
  @Input() FYI: any;
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;
  posts: any[] = [];
  constructor(private postsService: PostsService) {}

  ngOnInit() {
    console.log('FYI', this.FYI);
    this.getAll();
    this.subscribeToPosts$();
  }
  ngAfterViewInit() {
    this.addScrollListener();
  }
  addScrollListener(): void {
    const scrollElement = this.scrollContainer.nativeElement;
    scrollElement.addEventListener(
      'scroll',
      this.scrollHandler.bind(this),
      true
    );
  }
  scrollHandler(event: Event): void {
    const scrollElement = this.scrollContainer.nativeElement;
    const isScrolledToBottom =
      scrollElement.scrollTop + scrollElement.clientHeight >=
      scrollElement.scrollHeight;

    if (isScrolledToBottom) {
      // Reached the bottom of the scroll container, fetch more posts
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
