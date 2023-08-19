import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/core/services/posts.service';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css'],
})
export class TimelineComponent implements OnInit {
  constructor(private postsService: PostsService) {}

  ngOnInit() {
    this.getAll();
  }
  getAll(): void {
    this.postsService.getAll().subscribe({
      next: (response) => {
        console.log('timeline [getAll] response', response);
      },
      error: (err) => {},
      complete: () => {},
    });
  }
}
