import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { UsersService } from 'src/core/services/users.service';
import { GridActionsComponent } from '../grid-actions/grid-actions.component';
import { GridFooterComponent } from '../grid-footer/grid-footer.component';
import { GridHeaderComponent } from '../grid-header/grid-header.component';
import { TableComponent } from '../table/table.component';
@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css'],
  standalone: true,
  imports: [
    GridHeaderComponent,
    GridActionsComponent,
    GridFooterComponent,
    TableComponent,
    NgIf,
    NgFor,
    NgClass,
    SharedModule,
  ],
})
export class GridComponent implements OnInit {
  data: any = {};
  selectedUser;
  showAddUserModal: boolean = false;
  showEditUserModal: boolean = false;
  validators = Validators;
  isFormValid: boolean = false;
  showToast: boolean = false;
  toastType: string = '';
  toastMessage: string = '';
  disableHostScrolling: string = '';
  showDeletetionConfirmationModal: boolean = false;
  // pagination stuff
  page: number = 0;
  size: number = 5;
  constructor(private usersService: UsersService) {}

  ngOnInit() {
    this.getUsers(this.page, this.size);
  }
  getUsers(page?: number, size?: number): void {
    this.usersService.getAll(page, size).subscribe({
      next: (response) => {
        this.data = this.usersService.data$.value;
      },
      error: (err) => {
        console.log('error retreiving users:', err);
      },
      complete: () => {},
    });
  }
  postUser(user: any) {
    this.usersService.post(user).subscribe({
      next: (newUser) => {
        this.toastType = 'success';
        this.toastMessage = 'user was added successfly';
        this.toggleToast();
      },
      error: (err) => {
        console.log('error', err);
        this.toastType = 'error';
        this.toastMessage = `err: ${err}`;
        this.toggleToast();
      },
      complete: () => {
        this.closeAddUserModal();
      },
    });
  }
  deleteUser() {
    this.usersService.deleteById(this.selectedUser.id).subscribe({
      next: (deletedUser) => {
        // this.users = this.usersService.users$.value;
        this.toastType = 'success';
        this.toastMessage = 'user was deleted successfly';
        this.toggleToast();
      },
      error: (err) => {
        console.log('error', err);
        this.toastType = 'error';
        this.toastMessage = `err: ${err}`;
        this.toggleToast();
      },
      complete: () => {
        this.showDeletetionConfirmationModal = false;
      },
    });
  }
  toggleAddUserModal(emittedValue: boolean) {
    this.showAddUserModal = emittedValue;
  }
  closeAddUserModal() {
    this.showAddUserModal = false;
  }
  viewEditUserModal(emittedValue: boolean) {
    this.showEditUserModal = emittedValue;
  }
  toggleEditUserModal(emittedValue: any) {
    this.selectedUser = emittedValue;
  }
  closeEditUserModal() {
    this.showEditUserModal = false;
  }
  toggleToast() {
    this.showToast = !this.showToast;
    setTimeout(() => {
      this.showToast = false;
    }, 4000);
  }
  onFormSubmitted(emittedValue: any) {
    this.postUser(emittedValue);
  }
  checkFormStatus(emitFormStatus: any) {
    emitFormStatus == 'INVALID'
      ? (this.isFormValid = false)
      : (this.isFormValid = true);
  }
  toggleDeletetionModal(emittedValue: any) {
    this.selectedUser = emittedValue;
    this.showDeletetionConfirmationModal =
      !this.showDeletetionConfirmationModal;
  }
  public onGoTo(page: number): void {
    this.page = page;
    this.getUsers(this.page, this.size);
  }

  public onNext(page: number): void {
    this.page = page;
    this.getUsers(this.page, this.size);
  }

  public onPrevious(page: number): void {
    this.page = page;
    this.getUsers(this.page, this.size);
  }
}
