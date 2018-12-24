import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { WebRequestProvider } from '../../providers/web-request';
import { User } from '../../providers';
import { TranslateService } from '@ngx-translate/core';
import { MainPage } from '..';

/**
 * The Welcome Page is a splash page that quickly describes the app,
 * and then directs the user to create an account or log in.
 * If you'd like to immediately put the user onto a login/signup page,
 * we recommend not using the Welcome page.
*/
@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})
export class WelcomePage {

  private loginErrorString: string;
  account:{username:string, password:string} = {username:'', password:''};

  constructor(public navCtrl: NavController, 
    public user: User,
    public toastCtrl: ToastController,
    public translateService: TranslateService) { 
      this.translateService.get('LOGIN_ERROR').subscribe((value) => {
        this.loginErrorString = value;
      })
  }

  login() {
    //this.navCtrl.push('LoginPage');
    this.user.login(this.account).subscribe((resp) => {
      this.navCtrl.setRoot(MainPage);
    }, (err) => {
      this.navCtrl.setRoot(MainPage);
      // Unable to log in
      let toast = this.toastCtrl.create({
        message: this.loginErrorString,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });

    /* this.user.login({
        username:this.username,
        password:this.password
    }).then((ret)=>{
      if (!ret.error){
        this.navCtrl.setRoot('MainPage');
      }
    }) */
  }

  signup() {
    this.navCtrl.push('SignupPage');
  }
}
