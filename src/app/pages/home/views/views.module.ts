import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommentSectionComponent } from './comment-section/comment-section.component';
import { CompanyCardComponent } from './company-card/company-card.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { TagsInputComponent } from './create-post/tags-input/tags-input.component';
import { RelatedArticlesComponent } from './related-articles/related-articles.component';
import { TimelineComponent } from './timeline/timeline.component';

@NgModule({
  imports: [CommonModule, FormsModule, SharedModule],
  declarations: [
    CompanyCardComponent,
    CreatePostComponent,
    TimelineComponent,
    TagsInputComponent,
    CommentSectionComponent,
    RelatedArticlesComponent,
  ],
  exports: [
    CompanyCardComponent,
    CreatePostComponent,
    TimelineComponent,
    TagsInputComponent,
    CommentSectionComponent,
    RelatedArticlesComponent,
  ],
})
export class ViewsModule {}
