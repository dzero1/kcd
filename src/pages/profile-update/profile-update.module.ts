import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfileUpdatePage } from './profile-update';
import { TranslateModule } from '@ngx-translate/core';
import { NativeGeocoder } from '@ionic-native/native-geocoder';

@NgModule({
  declarations: [
    ProfileUpdatePage,
  ],
  imports: [
    IonicPageModule.forChild(ProfileUpdatePage),
    TranslateModule.forChild(),
  ],
  providers:[
    NativeGeocoder
  ]
})
export class ProfileUpdatePageModule {}
