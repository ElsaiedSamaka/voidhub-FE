import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { GeneralInfoComponent } from './general-info/general-info.component';
import { LangModeSettingsComponent } from './lang-mode-settings/lang-mode-settings.component';
import { ProfilePictureComponent } from './profile-picture/profile-picture.component';
import { SocialSettingsComponent } from './social-settings/social-settings.component';

@NgModule({
  imports: [SharedModule, TranslateModule, CommonModule],
  declarations: [
    GeneralInfoComponent,
    ProfilePictureComponent,
    LangModeSettingsComponent,
    SocialSettingsComponent,
  ],
  exports: [
    GeneralInfoComponent,
    ProfilePictureComponent,
    LangModeSettingsComponent,
    SocialSettingsComponent,
  ],
})
export class ViewsModule {}
