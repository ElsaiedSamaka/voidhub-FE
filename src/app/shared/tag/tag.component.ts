import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { PostsService } from 'src/core/services/posts.service';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css'],
})
export class TagComponent implements OnInit {
  @Input() tagObj: any;
  @Input() currentTheme: string = '';
  constructor(private postsService: PostsService) {}

  ngOnInit() {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.tagObj && changes.tagObj.currentValue) {
      // Update the tagObj value
      this.tagObj = changes.tagObj.currentValue;
    }
  }
  getPostsByTagId(tagId: any): void {
    this.postsService.getPostsByTagId(tagId).subscribe({
      next: (response) => {
        console.log('response', response);
      },
      error: (err) => {
        console.log('err', err);
      },
      complete: () => {},
    });
  }
}
