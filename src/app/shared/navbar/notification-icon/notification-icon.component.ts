import { Component, Input, OnInit } from '@angular/core';
import { SocketService } from 'src/core/services/socket.service';

@Component({
  selector: 'app-notification-icon',
  templateUrl: './notification-icon.component.html',
  styleUrls: ['./notification-icon.component.css'],
})
export class NotificationIconComponent implements OnInit {
  @Input() currentUser: any = null;
  @Input() currentTheme: any = null;
  showNotifcationDropDown: boolean = false;
  constructor(private socketService: SocketService) {}

  ngOnInit() {
    this.emmitCurrentUser();
  }
  toggleNotificationDropDown() {
    this.showNotifcationDropDown = !this.showNotifcationDropDown;
  }
  // emmit current User
  emmitCurrentUser() {
    this.socketService.socket.emit('currentUser', {
      userId: this.currentUser.id,
    });
  }
}
