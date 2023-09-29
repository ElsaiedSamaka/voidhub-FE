import { Component, Input, OnInit } from '@angular/core';
import { SocketService } from 'src/core/services/socket.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Input() currentUser: any = null;
  @Input() currentTheme: any = null;
  constructor(private socketService: SocketService) {}

  ngOnInit() {
    this.handleNewMessageNotification();
  }
  handleNewMessageNotification() {
    // Listen for the newMessageNotification event
    this.socketService.socket.on('newMessageNotification', (message) => {
      // Handle the new message notification
      console.log('New message notification:', message);
      // Update your UI or show a notification
    });
  }
}
