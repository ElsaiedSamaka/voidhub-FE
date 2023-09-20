import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { ThemeService } from 'src/app/shared/services/theme.service';
import { AuthService } from 'src/core/services/auth.service';
import { UsersService } from 'src/core/services/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  currentTheme: string = '';
  currentUser: any;
  validators = Validators;
  isUserFormValid: boolean = false;
  isPasswordFormValid: boolean = false;
  isUserFormEditMode: boolean = true;
  isPasswordFormEditMode: boolean = true;
  showPassword: boolean = false;
  constructor(
    private themeService: ThemeService,
    private authService: AuthService,
    private usersService: UsersService
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
  updateInfo(data: any): void {
    const currentUserID = this.currentUser.id;
    this.usersService.put(currentUserID, data).subscribe({
      next: (response) => {
        console.log('response', response);
      },
      error: (err) => {
        console.log('err', err);
      },
      complete: () => {},
    });
  }
  checkUserFormStatus(value: any) {
    switch (value) {
      case 'INVALID':
        this.isUserFormValid = false;
        break;
      case 'VALID':
        this.isUserFormValid = true;
        break;

      default:
        break;
    }
  }
  onUserFormSubmitted(data: any) {
    if (!this.isUserFormValid) return;
    this.isUserFormEditMode = !this.isUserFormEditMode;
    this.updateInfo(data);
  }
  toggleUserFormMode(): void {
    this.isUserFormEditMode = !this.isUserFormEditMode;
  }
  checkPasswordFormStatus(value: any) {
    switch (value) {
      case 'INVALID':
        this.isPasswordFormValid = false;
        break;
      case 'VALID':
        this.isPasswordFormValid = true;
        break;

      default:
        break;
    }
  }
  updatePassword(data: any): void {
    console.log('updatePassword', data);
    this.authService.updatePassword(data).subscribe({
      next: (response) => {
        console.log('response', response);
      },
      error: (err) => {
        console.log('err', err);
      },
      complete: () => {},
    });
  }
  onPasswordFormSubmitted(data: any) {
    console.log('onPasswordFormSubmitted', {
      password: data.password,
      passwordConfirmation: data.passwordConfirmation,
    });
    const {password,passwordConfirmation} = data
    if (!this.isPasswordFormValid) return;
    // // Serialize the form data to JSON.
    // const formData = JSON.stringify({
    //   password: data.password,
    //   passwordConfirmation: data.passwordConfirmation,
    // });
    this.updatePassword({ password ,passwordConfirmation});
    this.isPasswordFormEditMode = !this.isPasswordFormEditMode;
  }
  togglePasswordFormMode(): void {
    this.isPasswordFormEditMode = !this.isPasswordFormEditMode;
  }
  togglePassword(value: any) {
    setTimeout(() => {
      this.showPassword = value;
    }, 0);
  }
}
