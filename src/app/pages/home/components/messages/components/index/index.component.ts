import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/shared/services/theme.service';
import { AuthService } from 'src/core/services/auth.service';
import { ChatService } from 'src/core/services/chat.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent implements OnInit {
  currentTheme: string = '';
  currentUser: any;

  constructor(
    private themeService: ThemeService,
    private authService: AuthService,
    private chatService: ChatService
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
    this.getConversations();
  }
  getConversations() {
    this.chatService.getConversations(this.currentUser.id);
    this.chatService.conversations$.subscribe(() => {
      console.log(
        'this.chatService.conversations$.value',
        this.chatService.conversations$.value
      );
    });
  }
}
