import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomeComponent } from './components/home/home.component';
import { SettingsRoutingModule } from './settings-routing.module';

@NgModule({
  imports: [
    TranslateModule, // Import TranslateModule here
    CommonModule,
    SharedModule,
    SettingsRoutingModule,
  ],
  declarations: [HomeComponent],
})
export class SettingsModule {}
