import { Component, Input, OnInit } from '@angular/core';
import { Validators } from 'ngx-editor';
import { UsersService } from 'src/core/services/users.service';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.css'],
})
export class ProfileSettingsComponent implements OnInit {
  @Input() currentTheme = '';
  @Input() currentUser = null;
  isProfileFormValid: boolean = false;
  validators = Validators;
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
  checkProfileFormStatus(value: any) {
    switch (value) {
      case 'INVALID':
        this.isProfileFormValid = false;
        break;
      case 'VALID':
        this.isProfileFormValid = true;
        break;

      default:
        break;
    }
  }
  onProfileFormSubmitted(data: any) {
    if (!this.isProfileFormValid) return;
    // this.updateInfo(data);
    console.log('profile form data', data);
  }
}
