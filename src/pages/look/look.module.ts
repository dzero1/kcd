import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LookPage } from './look';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    LookPage,
  ],
  imports: [
    IonicPageModule.forChild(LookPage),
    TranslateModule.forChild()
  ],
})
export class LookPageModule {}
