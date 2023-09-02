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
}
