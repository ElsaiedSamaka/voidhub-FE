import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { PostsService } from 'src/core/services/posts.service';

@Component({
  selector: 'app-search-modal',
  templateUrl: './search-modal.component.html',
  styleUrls: ['./search-modal.component.css'],
})
export class SearchModalComponent implements OnInit {
  @Input() currentTheme: string = '';
  @Output() dismiss = new EventEmitter<boolean>();
  t;
  constructor(private el: ElementRef, private postsService: PostsService) {}

  ngOnInit() {
    document.body.appendChild(this.el.nativeElement);
  }
  ngOnDestory() {
    this.el.nativeElement.remove();
  }
  onDismissClick() {
    this.dismiss.emit(false);
  }
  handleTchange() {
    console.log('[1;32m', this.t);
    this.postsService.searchPosts(this.t).subscribe({
      next: (response) => {
        console.log('[1;32m', 'response [SearchModal]', response);
      },
    });
    // this.t = event.target.value;
    // console.log('[1;32m', 't', this.t);
  }
}
