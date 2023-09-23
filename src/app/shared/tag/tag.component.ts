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
  selectedTags: any[] = [];
  constructor(private postsService: PostsService) {}

  ngOnInit() {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.tagObj && changes.tagObj.currentValue) {
      // Update the tagObj value
      this.tagObj = changes.tagObj.currentValue;
    }
  }
  getPostsByTagId(tagId: any): void {
    this.selectedTags.push(tagId);
    const tags = [...this.selectedTags]; // Create a new array copy
    console.log('tags', tags);
    this.postsService.getPostsByTags(tags).subscribe({
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
