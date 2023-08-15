import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomeComponent } from './components/home/home.component';
import { SettingsRoutingModule } from './settings-routing.module';

@NgModule({
  imports: [CommonModule, SharedModule, SettingsRoutingModule],
  declarations: [HomeComponent],
})
export class SettingsModule {}
