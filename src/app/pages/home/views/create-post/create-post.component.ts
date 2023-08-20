import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { PostsService } from 'src/core/services/posts.service';

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
  showToast: boolean = false;
  toastMessage: string = '';
  toastType: string = '';
  constructor(private postsService: PostsService) {}

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
    this.postArticle(value);
  }
  handleHTML(value: any) {
    this.receivedHTMLContent = value;
  }
  postArticle(article: any): void {
    this.postsService.post(article).subscribe({
      next: (response) => {
        this.toggleToast('success', 'post publish !');
      },
      error: (err) => {
        this.toggleToast('error', 'somthing went wrong !');
      },
      complete: () => {},
    });
  }
  toggleToast(toastType: any, toastMessage: any): void {
    this.showToast = true;
    this.toastType = toastType;
    this.toastMessage = toastMessage;
    setTimeout(() => {
      this.showToast = false;
    }, 3000);
  }
}
