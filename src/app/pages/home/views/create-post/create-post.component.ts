import { Component, Input, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { PostsService } from 'src/core/services/posts.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
})
export class CreatePostComponent implements OnInit {
  @Input() currentTheme: string = '';
  showCreateNewPostModal: boolean = false;
  validators = Validators;
  isFormValid: boolean = false;
  receivedHTMLContent: string = '';
  receivedTags: any[] = [];
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
  onFormSubmitted(article: any) {
    if (!this.isFormValid) return;
    let tagsIds = this.receivedTags.map((tag) => tag.id);
    let content = this.receivedHTMLContent;
    
    article.append('tagsIds', tagsIds);
    article.append('content', content);
    this.postArticle(article);
  }
  handleRecievedTags(tags: any): void {
    this.receivedTags = tags;
  }
  handleHTML(html: any) {
    this.receivedHTMLContent = html;
  }
  postArticle(article: any): void {
    this.postsService.post(article).subscribe({
      next: (response) => {
        this.toggleToast('success', 'post publish !');
      },
      error: (err) => {
        this.toggleToast('error', err.message);
        this.closeCreateNewPostModal();
      },
      complete: () => {
        this.closeCreateNewPostModal();
        // once a user post an article we wanna reset the array of the recieved tags and the html content
        this.receivedTags = [];
        this.receivedHTMLContent = ''
      },
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
