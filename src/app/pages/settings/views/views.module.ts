import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { GeneralInfoComponent } from './general-info/general-info.component';

@NgModule({
  imports: [SharedModule, TranslateModule, CommonModule],
  declarations: [GeneralInfoComponent],
  exports: [GeneralInfoComponent],
})
export class ViewsModule {}
