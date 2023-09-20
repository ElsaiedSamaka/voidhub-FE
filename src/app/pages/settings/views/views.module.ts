import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { GeneralInfoComponent } from './general-info/general-info.component';
import { LangModeSettingsComponent } from './lang-mode-settings/lang-mode-settings.component';
import { ProfilePictureComponent } from './profile-picture/profile-picture.component';
import { SocialSettingsComponent } from './social-settings/social-settings.component';
import { PasswordSettingsComponent } from './password-settings/password-settings.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [SharedModule, TranslateModule, ReactiveFormsModule, CommonModule],
  declarations: [
    GeneralInfoComponent,
    ProfilePictureComponent,
    LangModeSettingsComponent,
    SocialSettingsComponent,
    PasswordSettingsComponent,
  ],
  exports: [
    GeneralInfoComponent,
    ProfilePictureComponent,
    LangModeSettingsComponent,
    SocialSettingsComponent,
    PasswordSettingsComponent,
  ],
})
export class ViewsModule {}
