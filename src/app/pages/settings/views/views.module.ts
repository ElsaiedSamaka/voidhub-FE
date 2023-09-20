import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { GeneralInfoComponent } from './general-info/general-info.component';
import { ProfilePictureComponent } from './profile-picture/profile-picture.component';
import { LangModeSettingsComponent } from './lang-mode-settings/lang-mode-settings.component';

@NgModule({
  imports: [SharedModule, TranslateModule, CommonModule],
  declarations: [
    GeneralInfoComponent,
    ProfilePictureComponent,
    LangModeSettingsComponent,
  ],
  exports: [
    GeneralInfoComponent,
    ProfilePictureComponent,
    LangModeSettingsComponent,
  ],
})
export class ViewsModule {}
