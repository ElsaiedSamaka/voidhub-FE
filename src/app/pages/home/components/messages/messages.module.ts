import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { DetailedComponent } from './components/detailed/detailed.component';
import { IndexComponent } from './components/index/index.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PlaceholderComponent } from './components/placeholder/placeholder.component';
import { SettingsComponent } from './components/settings/settings.component';
import { MessagesRoutingModule } from './messages-routing.module';

@NgModule({
  imports: [MessagesRoutingModule, SharedModule, CommonModule, FormsModule],
  declarations: [
    IndexComponent,
    PlaceholderComponent,
    DetailedComponent,
    NotFoundComponent,
    SettingsComponent,
  ],
})
export class MessagesModule {}
