import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/shared/services/theme.service';
import { AuthService } from 'src/core/services/auth.service';
import { SocketService } from 'src/core/services/socket.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent implements OnInit {
  currentUser: any;
  currentTheme: string = '';

  constructor(
    private themeService: ThemeService,
    private authService: AuthService,
    private socketService: SocketService
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
    this.emmitCurrentUser();
  }
  // emmit current User
  emmitCurrentUser() {
    this.socketService.socket.emit('currentUser', {
      userId: this.currentUser.id,
    });
  }
}
