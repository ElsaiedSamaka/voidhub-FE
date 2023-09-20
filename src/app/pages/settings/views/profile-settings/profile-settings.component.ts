import { Component, Input, OnInit } from '@angular/core';
import { UsersService } from 'src/core/services/users.service';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.css'],
})
export class ProfileSettingsComponent implements OnInit {
  @Input() currentTheme = '';
  @Input() currentUser = null;
  constructor(private usersService: UsersService) {}

  ngOnInit() {}
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
}
