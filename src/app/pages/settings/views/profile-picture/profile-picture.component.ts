import { Component, Input, OnInit } from '@angular/core';
import { UsersService } from 'src/core/services/users.service';

@Component({
  selector: 'app-profile-picture',
  templateUrl: './profile-picture.component.html',
  styleUrls: ['./profile-picture.component.css'],
})
export class ProfilePictureComponent implements OnInit {
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
