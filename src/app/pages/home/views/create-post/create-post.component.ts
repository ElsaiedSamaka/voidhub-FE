import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
})
export class CreatePostComponent implements OnInit {
  showCreateNewPostModal: boolean = false;
  validators = Validators;
  isFormValid: boolean = false;
  receivedHTMLContent: string = '';
  constructor() {}

  ngOnInit() {}
  openCreateNewPostModal() {
    this.showCreateNewPostModal = true;
  }
  closeCreateNewPostModal() {
    this.showCreateNewPostModal = false;
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
  onFormSubmitted(value: any) {
    if (!this.isFormValid) return;
    console.log('formValue', value);
  }
  handleHTML(value: any) {
    this.receivedHTMLContent = value;
  }
}
