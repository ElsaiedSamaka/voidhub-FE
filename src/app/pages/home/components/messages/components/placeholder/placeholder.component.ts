import { Component, OnInit } from '@angular/core';
import { Validators } from 'ngx-editor';
import { debounceTime, distinctUntilChanged, of, switchMap } from 'rxjs';
import { ThemeService } from 'src/app/shared/services/theme.service';
import { AuthService } from 'src/core/services/auth.service';
import { UsersService } from 'src/core/services/users.service';

@Component({
  selector: 'app-placeholder',
  templateUrl: './placeholder.component.html',
  styleUrls: ['./placeholder.component.css'],
})
export class PlaceholderComponent implements OnInit {
  currentTheme: string = '';
  currentUser: any;
  showNewConversationModal: boolean = false;
  validators = Validators;
  isFormValid: boolean = false;
  showUsersDropdown: boolean = false;
  users: any[] = [];
  selectedUsers: any[] = [];
  email: string = '';

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
  openNewConversationModal() {
    this.showNewConversationModal = true;
  }
  closeNewConversationModal() {
    this.showNewConversationModal = false;
  }
  checkFormStatus(value: any) {
    switch (value) {
      case 'INVALID':
        this.isFormValid = false;
        break;
      case 'VALID':
        this.isFormValid = true;
        break;

      default:
        break;
    }
  }
  onFormSubmitted(article: any) {
    if (!this.isFormValid) return;
    // post form value
  }
  handleEmailChange() {
    this.getUsers();
  }
  getUsers() {
    this.usersService
      .getUsers(this.email)
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap((users) => {
          if (users.length > 10) {
            users = users.slice(0, 10);
          }
          return of(users);
        })
      )
      .subscribe({
        next: (users) => {
          this.users = users.map((user) => ({
            ...user,
            isSelected: false,
          }));
        },
        error: (err) => {
          console.log('error while retrieving users', err);
        },
        complete: () => {},
      });
  }
  handleUserSelect(event) {
    const userId = event.target.value;
    const isChecked = event.target.checked;
    const user = this.users.find((u) => u.id == userId);
    const selectedIndex = this.selectedUsers.findIndex((u) => u.id == userId);

    if (isChecked) {
      if (selectedIndex === -1) {
        this.selectedUsers.push(user);
      }
      this.showUsersDropdown = false;
      this.email = '';
    } else {
      if (selectedIndex !== -1) {
        this.selectedUsers.splice(selectedIndex, 1);
      }
      this.email = '';
      this.showUsersDropdown = false;
    }
  }
}
