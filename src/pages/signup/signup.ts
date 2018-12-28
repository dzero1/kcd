import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';

import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordValidator } from '../../models/password-validator';
import { User } from '../../providers/user/user';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account:{username: string, password: string, password2:string, phone:string } = {
    username: '',
    password: '', 
    password2:'', 
    phone:'', 
  };

  // Our translated text strings
  private signupErrorString: string;
  private requiredError:string;

  private validations_username:FormGroup;
  private matching_passwords_group:FormGroup;
  private validations_phone:FormGroup;

  constructor(public navCtrl: NavController,
    private user: User,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    private formBuilder:FormBuilder) {

    this.translateService.get('SIGNUP_ERROR').subscribe((value) => {
      this.signupErrorString = value;
    })

    this.translateService.get('FILL_ALL_FIELDS').subscribe((value) => {
      this.requiredError = value;
    })

    this.validations_username = this.formBuilder.group({
      username: new FormControl('', Validators.compose([
        Validators.maxLength(30),
		    Validators.minLength(3),
        Validators.required,
        //Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      ]))
    });

    this.validations_phone = this.formBuilder.group({
      phone: new FormControl('', Validators.compose([
        Validators.required,
        //Validators.pattern('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$')
      ]))
    });

    this.matching_passwords_group = this.formBuilder.group({
      password: new FormControl('', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(30),
        Validators.required,
        //Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$') //this is for the letters (both uppercase and lowercase) and numbers validation
      ])),
      confirm_password: new FormControl('', Validators.required)
    }, {
      validator:PasswordValidator.MatchPassword
    });
    
  }

  validation_messages = {
    'username': [
      { type: 'required', message: 'Username is required.' },
      { type: 'minlength', message: 'Username must be at least 3 characters long.' },
      { type: 'maxlength', message: 'Username cannot be more than 30 characters long.' },
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 3 characters long.' },
      { type: 'maxlength', message: 'Password cannot be more than 30 characters long.' },
    ],
    'confirm_password': [
      { type: 'required', message: 'Confirm password is required.' },
      { type: 'minlength', message: 'Confirm password must be at least 3 characters long.' },
      { type: 'maxlength', message: 'Confirm password cannot be more than 30 characters long.' },
      { type: 'MatchPassword', message: 'Password and Confirm password should be equal.' },
    ],
    'phone': [
      { type: 'required', message: 'Phone number is required.' },
      { type: 'pattern', message: 'Not a valid phone number.' },
    ],
  }

  doSignup() {
    // Attempt to login in through our User service
    if ( this.validations_username.valid && this.matching_passwords_group.valid && this.validations_phone.valid ){
      let signupreq =  this.user.signup(this.account);
      signupreq.then((resp:any) => {
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
        message: this.requiredError,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    }
  }

}
