import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Items } from '../../providers/items/items';

/**
 * Generated class for the MainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {

  look:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public items:Items) {
    if (navParams.get('look')) this.look = navParams.get('look');
  }

  ionViewDidLoad() {
    if (this.look)
      this.items.query(this.look);
    else 
      this.items.query();
  }

}
