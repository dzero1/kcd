import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MainPage } from './main';
import { TranslateModule } from '@ngx-translate/core';
import { Items } from '../../providers/items/items';

@NgModule({
  declarations: [
    MainPage,
  ],
  imports: [
    IonicPageModule.forChild(MainPage),
    TranslateModule.forChild(),
  ],
  providers: [
    Items
  ]
})
export class MainPageModule {}
