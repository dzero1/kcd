import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the LookPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-look',
  templateUrl: 'look.html',
})
export class LookPage {

  look:{district:string, homearea:string, gender:string} = {district:'', homearea:'', gender:''};

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LookPage');
  }

  enternow(){
    this.navCtrl.push('MainPage', this.look)
  }

}
