import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';

import { User } from '../../providers';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account:{username: string, password: string, password2:string } = {
    username: '',
    password: '', 
    password2:'', 
  };

  // Our translated text strings
  private signupErrorString: string;

  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public translateService: TranslateService) {

    this.translateService.get('SIGNUP_ERROR').subscribe((value) => {
      this.signupErrorString = value;
    })
  }

  doSignup() {
    // Attempt to login in through our User service
    if (this.account.password == this.account.password2){
      this.user.signup(this.account).then((resp:any) => {
        if (!resp.error) {
          this.navCtrl.push('ProfileUpdatePage', {from:'signup'});
        } else {
          // Unable to sign up
          let toast = this.toastCtrl.create({
            message: resp.message,
            duration: 3000,
            position: 'top'
          });
          toast.present();
        }
      }).catch(err => {
        // Unable to sign up
        let toast = this.toastCtrl.create({
          message: this.signupErrorString,
          duration: 3000,
          position: 'top'
        });
        toast.present();
      });
    } else {
      let toast = this.toastCtrl.create({
        message: this.signupErrorString,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    }
  }

}
