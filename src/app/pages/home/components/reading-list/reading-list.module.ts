import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ArchiveComponent } from './components/archive/archive.component';
import { DetailedComponent } from './components/detailed/detailed.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PlaceholderComponent } from './components/placeholder/placeholder.component';
import { ReadingListRoutingModule } from './reading-list-routing.module';

@NgModule({
  imports: [CommonModule, SharedModule, ReadingListRoutingModule],
  declarations: [
    HomeComponent,
    PlaceholderComponent,
    NotFoundComponent,
    DetailedComponent,
    ArchiveComponent,
  ],
})
export class ReadingListModule {}
