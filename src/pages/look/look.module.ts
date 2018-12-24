import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LookPage } from './look';

@NgModule({
  declarations: [
    LookPage,
  ],
  imports: [
    IonicPageModule.forChild(LookPage),
  ],
})
export class LookPageModule {}
