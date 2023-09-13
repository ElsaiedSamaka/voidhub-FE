import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ThemeService } from 'src/app/shared/services/theme.service';
import { AuthService } from 'src/core/services/auth.service';
import { PostsService } from 'src/core/services/posts.service';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css'],
})
export class BlogDetailsComponent implements OnInit {
  data: any = {};
  currentTheme: string = '';
  currentUser: any;
  alreadySavedArticle: any;

  constructor(
    private route: ActivatedRoute,
    private themeService: ThemeService,
    private authService: AuthService,
    private postsService: PostsService
  ) {}

  ngOnInit() {
    this.getBlog();
    this.getCurrentTheme();
    this.getCurrentUser();
    this.alreadySavedArticle = this.articleAlreadyExistOnSaved();
    console.log('this.alreadySavedArticle', this.alreadySavedArticle);
  }
  getBlog() {
    this.route.data.subscribe((data) => {
      this.data = data;
    });
  }
  getCurrentTheme(): void {
    this.themeService.theme$.subscribe((theme) => {
      this.currentTheme = theme;
    });
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
  saveArticle(event: any): void {
    event.stopPropagation();
    let articleId = this.data.article.id;
    if (!this.articleAlreadyExistOnSaved()) {
      this.postsService.save(articleId).subscribe({
        next: () => {},
        error: () => {},
        complete: () => {
          // this.saveCount += 1;
        },
      });
    } else {
      this.postsService.unsave(articleId).subscribe({
        next: () => {},
        error: () => {},
        complete: () => {
          // this.saveCount -= 1;
        },
      });
    }
  }
  articleAlreadyExistOnSaved(): boolean {
    if (!this.data.article.saved_posts) {
      return false; // No saved_posts array exists, so the article doesn't exist in saved posts
    }

    this.alreadySavedArticle = this.data.article.saved_posts.find(
      (item) => item.userId === this.currentUser.id
    );

    return !!this.alreadySavedArticle; // Return true if alreadySavedArticle is truthy, false otherwise
  }
}
