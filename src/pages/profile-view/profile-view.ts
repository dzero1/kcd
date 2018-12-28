import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Api, User } from '../../providers';
import { CallNumber } from '@ionic-native/call-number';
import { TranslateService } from '@ngx-translate/core';

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
  _user:any;
  PROFILE_INFO_1:string;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private api:Api, private user:User, public translateService: TranslateService, 
    private callNumber: CallNumber) {

    if (navParams.get('item')) this.item = navParams.get('item');
    this.apiroot = api.url;
    this._user = this.user.USER;

    this.translateService.get('PROFILE_INFO_1').subscribe((value) => {
      this.PROFILE_INFO_1 = value;
      this.translateService.get(this.item.gender == 'Female' ? 'HER' : 'HIS').subscribe((h) => { 
        this.PROFILE_INFO_1 = this.PROFILE_INFO_1.replace('****', h);
      });
    })
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

  login() {
    this.navCtrl.push('LoginPage');
  }

  signup() {
    this.navCtrl.push('SignupPage');
  }


}
