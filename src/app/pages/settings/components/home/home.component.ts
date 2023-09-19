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
  onPasswordFormSubmitted(data: any) {
    if (!this.isUserFormValid) return;
    this.isPasswordFormEditMode = !this.isPasswordFormEditMode;
    // this.updateInfo(data);
    console.log('data', data);
  }
  togglePasswordFormMode(): void {
    this.isPasswordFormEditMode = !this.isPasswordFormEditMode;
  }
  togglePassword(value: any) {
    this.showPassword = value;
  }
}
