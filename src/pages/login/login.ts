import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../../providers/user/user';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  private loginErrorString: string;
  account:{username:string, password:string} = {username:'', password:''};

  constructor(public navCtrl: NavController, 
    public user: User,
    public toastCtrl: ToastController, public navParams: NavParams,
    public translateService: TranslateService) {
      this.translateService.get('LOGIN_ERROR').subscribe((value) => {
        this.loginErrorString = value;
      })
  }

  login(){
    this.user.login(this.account).then((resp) => {
      this.navCtrl.setRoot('LookPage');
    }).catch((err) => {
      // Unable to log in
      let toast = this.toastCtrl.create({
        message: this.loginErrorString,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    }); 
  }

  signup() {
    this.navCtrl.push('SignupPage');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
