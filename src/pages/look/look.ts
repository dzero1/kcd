import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { User } from '../../providers/user/user';

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
  _user;

  look:{district:string, homearea:string, gender:string} = {district:'', homearea:'', gender:''};

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    user: User,
    public menuCtrl: MenuController    ) {
    this._user = user.USER;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LookPage');
  }

  enternow(){
    this.navCtrl.push('MainPage', {'look':this.look});
  }

  showMenu(){
    this.menuCtrl.toggle('menu');
  }

}
