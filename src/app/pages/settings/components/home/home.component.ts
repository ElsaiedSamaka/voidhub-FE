import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { ThemeService } from 'src/app/shared/services/theme.service';
import { AuthService } from 'src/core/services/auth.service';
import { UsersService } from 'src/core/services/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  currentTheme: string = '';
  currentUser: any;
  validators = Validators;
  isFormValid: boolean = false;
  constructor(
    private themeService: ThemeService,
    private authService: AuthService,
    private usersService: UsersService
  ) {}

  ngOnInit() {
    this.themeService.theme$.subscribe((theme) => {
      this.currentTheme = theme;
    });
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
  updateProfileImg(): void {
    const currentUserID = this.currentUser.id;
    this.usersService.put(currentUserID, {}).subscribe({
      next: (response) => {
        console.log('response', response);
      },
      error: (err) => {
        console.log('err', err);
      },
      complete: () => {},
    });
  }
  updateInfo(): void {
    const currentUserID = this.currentUser.id;
    this.usersService.put(currentUserID, {}).subscribe({
      next: (response) => {
        console.log('response', response);
      },
      error: (err) => {
        console.log('err', err);
      },
      complete: () => {},
    });
  }
  checkFormStatus(value: any) {
    switch (value) {
      case 'INVALID':
        this.isFormValid = false;
        break;
      case 'VALID':
        this.isFormValid = true;
        break;

      default:
        break;
    }
  }
  onFormSubmitted(data: any) {
    if (!this.isFormValid) return;
    // let tagsIds = this.receivedTags.map((tag) => tag.id);
    // let content = this.receivedHTMLContent;
    // let userId = this.currentUser.id;
    // let isAnonymous = this.dataService.isAnonymous$.value;
    // article.append('tagsIds', tagsIds);
    // article.append('content', content);
    // article.append('userId', userId);
    // article.append('isAnonymous', isAnonymous);
    // this.postArticle(article);
  }
}
