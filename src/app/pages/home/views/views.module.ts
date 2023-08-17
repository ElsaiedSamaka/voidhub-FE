import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { CompanyCardComponent } from './company-card/company-card.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { TimelineComponent } from './timeline/timeline.component';

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [CompanyCardComponent, CreatePostComponent, TimelineComponent],
  exports: [CompanyCardComponent, CreatePostComponent, TimelineComponent],
})
export class ViewsModule {}
