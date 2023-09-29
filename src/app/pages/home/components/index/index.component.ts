import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/core/services/auth.service';
import { SocketService } from 'src/core/services/socket.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent implements OnInit {
  currentUser: any;
  constructor(
    private authService: AuthService,
    private socketService: SocketService
  ) {}

  ngOnInit() {
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
