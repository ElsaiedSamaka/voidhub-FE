import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/core/services/auth.service';
import { PostsService } from 'src/core/services/posts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  currentUser: any;
  posts: any[] = [];
  constructor(
    private authService: AuthService,
    private postsService: PostsService
  ) {}

  ngOnInit() {
    this.getCurrentUser();
    this.getPostsByUseId();
  }
  getCurrentUser(): void {
    this.authService.currentUser$.subscribe({
      next: (currentUser) => {
        this.currentUser = currentUser;
      },
      error: (err) => {
        console.log('err', err);
      },
      complete: () => {},
    });
  }
  getPostsByUseId(): void {
    this.postsService.getPostsByUseId(this.currentUser.id).subscribe({
      next: (response) => {
        this.posts = this.postsService.posts$.value;
      },
      error: (err) => {
        console.log('err', err);
      },
      complete: () => {},
    });
  }
}
