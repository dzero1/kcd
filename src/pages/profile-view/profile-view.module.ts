import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfileViewPage } from './profile-view';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ProfileViewPage,
  ],
  imports: [
    IonicPageModule.forChild(ProfileViewPage),
    TranslateModule.forChild(),
  ],
})
export class ProfileViewPageModule {}
