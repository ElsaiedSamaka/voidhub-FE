import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-notification-icon',
  templateUrl: './notification-icon.component.html',
  styleUrls: ['./notification-icon.component.css'],
})
export class NotificationIconComponent implements OnInit {
  @Input() currentUser: any = null;
  @Input() currentTheme: any = null;
  showNotifcationDropDown:boolean = false
  constructor() {}

  ngOnInit() { }
  toggleNotificationDropDown() {
    this.showNotifcationDropDown = !this.showNotifcationDropDown
  }
}
