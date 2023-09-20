import { Component, Input, OnInit } from '@angular/core';
import { Validators } from 'ngx-editor';
import { AuthService } from 'src/core/services/auth.service';

@Component({
  selector: 'app-password-settings',
  templateUrl: './password-settings.component.html',
  styleUrls: ['./password-settings.component.css'],
})
export class PasswordSettingsComponent implements OnInit {
  @Input() currentTheme = '';
  @Input() currentUser = null;
  validators = Validators;
  isPasswordFormValid: boolean = false;
  isPasswordFormEditMode: boolean = true;
  showPassword: boolean = false;
  constructor(private authService: AuthService) {}

  ngOnInit() {}

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
