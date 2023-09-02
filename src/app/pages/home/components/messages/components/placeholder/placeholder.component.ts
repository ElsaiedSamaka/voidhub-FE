import { Component, OnInit } from '@angular/core';
import { Validators } from 'ngx-editor';
import { ThemeService } from 'src/app/shared/services/theme.service';
import { AuthService } from 'src/core/services/auth.service';

@Component({
  selector: 'app-placeholder',
  templateUrl: './placeholder.component.html',
  styleUrls: ['./placeholder.component.css'],
})
export class PlaceholderComponent implements OnInit {
  currentTheme: string = '';
  currentUser: any;
  showNewConversationModal: boolean = false;
  validators = Validators;
  isFormValid: boolean = false;
  showUsersDropdown: boolean = false;
  constructor(
    private themeService: ThemeService,
    private authService: AuthService
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
  openNewConversationModal() {
    this.showNewConversationModal = true;
  }
  closeNewConversationModal() {
    this.showNewConversationModal = false;
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
  onFormSubmitted(article: any) {
    if (!this.isFormValid) return;
    // post form value
  }
}
