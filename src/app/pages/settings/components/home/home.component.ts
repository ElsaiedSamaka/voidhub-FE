import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { ThemeService } from 'src/app/shared/services/theme.service';
import { AuthService } from 'src/core/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  currentTheme: string = '';
  currentUser: any;
  validators = Validators;
  isPasswordFormValid: boolean = false;
  isPasswordFormEditMode: boolean = true;
  showPassword: boolean = false;
  constructor(
    private themeService: ThemeService,
    private authService: AuthService
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
  // updateProfileImg(): void {
  //   const currentUserID = this.currentUser.id;
  //   this.usersService.put(currentUserID, {}).subscribe({
  //     next: (response) => {
  //       console.log('response', response);
  //     },
  //     error: (err) => {
  //       console.log('err', err);
  //     },
  //     complete: () => {},
  //   });
  // }

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
    const { password, passwordConfirmation } = data;
    if (!this.isPasswordFormValid) return;
    // // Serialize the form data to JSON.
    // const formData = JSON.stringify({
    //   password: data.password,
    //   passwordConfirmation: data.passwordConfirmation,
    // });
    this.updatePassword({ password, passwordConfirmation });
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
