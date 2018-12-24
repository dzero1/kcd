import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Api } from '../../providers';
import { CallNumber } from '@ionic-native/call-number';

/**
 * Generated class for the ProfileViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile-view',
  templateUrl: 'profile-view.html',
})
export class ProfileViewPage {

  item:any;
  apiroot:string;
  canMakeCall:boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, private api:Api, private callNumber: CallNumber) {
    if (navParams.get('item')) this.item = navParams.get('item');
    this.apiroot = api.url;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfileViewPage');

    this.callNumber.isCallSupported()
    .then(function (response) {
      this.canMakeCall = response;
    });
  }

  makeCall(phone){
    this.callNumber.callNumber(`02073627291`, true);
  }

}
