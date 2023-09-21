import { Component, Input, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { DataService } from 'src/app/shared/services/data.service';
import { PostsService } from 'src/core/services/posts.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
})
export class CreatePostComponent implements OnInit {
  @Input() currentTheme: string = '';
  @Input() currentUser: any = null;
  showCreateNewPostModal: boolean = false;
  validators = Validators;
  isFormValid: boolean = false;
  isFormSubmitted: boolean = false;
  receivedHTMLContent: string = '';
  receivedTags: any[] = [];
  showToast: boolean = false;
  toastMessage: string = '';
  toastType: string = '';
  postAs;
  constructor(
    private postsService: PostsService,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.dataService.isAnonymous$.subscribe((postAs) => {
      this.postAs = postAs;
    });
  }
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
    let userId = this.currentUser.id;
    let isAnonymous = this.dataService.isAnonymous$.value;
    article.append('tagsIds', tagsIds);
    article.append('content', content);
    article.append('userId', userId);
    article.append('isAnonymous', isAnonymous);
    this.isFormSubmitted = true;
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
        this.isFormSubmitted = false;
        this.toggleToast('error', err.message);
        this.closeCreateNewPostModal();
      },
      complete: () => {
        this.isFormSubmitted = false;
        this.closeCreateNewPostModal();
        // once a user post an article we wanna reset the array of the recieved tags and the html content
        this.receivedTags = [];
        this.receivedHTMLContent = '';
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
