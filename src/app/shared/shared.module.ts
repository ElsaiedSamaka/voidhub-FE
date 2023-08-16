import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AlertComponent } from './alert/alert.component';
import { ArticleComponent } from './article/article.component';
import { EmojiPickerComponent } from './emoji-picker/emoji-picker.component';
import { FooterComponent } from './footer/footer.component';
import { FormComponent } from './form/form.component';
import { HeaderComponent } from './header/header.component';
import { InputComponent } from './input/input.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { ModalComponent } from './modal/modal.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PopupComponent } from './popup/popup.component';
import { ProseComponent } from './prose/prose.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ToastComponent } from './toast/toast.component';
import { UserAvatarComponent } from './user-avatar/user-avatar.component';

@NgModule({
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  declarations: [
    ModalComponent,
    PopupComponent,
    InputComponent,
    FormComponent,
    ToastComponent,
    LoadingSpinnerComponent,
    EmojiPickerComponent,
    NavbarComponent,
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
    AlertComponent,
    ProseComponent,
    UserAvatarComponent,
    ArticleComponent,
  ],
  exports: [
    ModalComponent,
    PopupComponent,
    InputComponent,
    FormComponent,
    ToastComponent,
    LoadingSpinnerComponent,
    EmojiPickerComponent,
    NavbarComponent,
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
    AlertComponent,
    ProseComponent,
    UserAvatarComponent,
    ArticleComponent,
  ],
})
export class SharedModule {}
