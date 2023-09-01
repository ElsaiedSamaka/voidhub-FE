import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IndexComponent } from './components/index/index.component';
import { MessagesRoutingModule } from './messages-routing.module';

@NgModule({
  imports: [MessagesRoutingModule, CommonModule],
  declarations: [IndexComponent],
})
export class MessagesModule {}
