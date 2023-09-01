import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IndexComponent } from './components/index/index.component';
import { PlaceholderComponent } from './components/placeholder/placeholder.component';
import { MessagesRoutingModule } from './messages-routing.module';

@NgModule({
  imports: [MessagesRoutingModule, CommonModule],
  declarations: [IndexComponent, PlaceholderComponent],
})
export class MessagesModule {}
