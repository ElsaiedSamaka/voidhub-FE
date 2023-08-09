import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomeComponent } from './components/home/home.component';
import { ProfileRoutingModule } from './profile-routing.module';

@NgModule({
  imports: [CommonModule, SharedModule, ProfileRoutingModule],
  declarations: [HomeComponent],
})
export class ProfileModule {}
