import 'rxjs/add/operator/toPromise';

import { Injectable } from '@angular/core';

import { Api } from '../api/api';
import { TranslateService } from '@ngx-translate/core';
import { Settings } from '../settings/settings';
import { Events, Platform } from 'ionic-angular';

@Injectable()
export class User {
  USER: any;
  token: any;

  constructor(public api: Api, 
    platform: Platform, 
    private settings:Settings, private events:Events) 
  {
    platform.ready().then(() => {
      this.settings.load().then( ()=>{
        this.settings.getValue('user').then((res)=>{
          if (res) {
            this.login(res);
          }
        });
      });
    });
  }

  login(accountInfo: any, redirect = true) {
    let seq = this.api.post('user/signin', accountInfo).share();
    this.settings.setValue('user', accountInfo);

    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      if (!res.error) {
        this.setupData(res);
        if (redirect) this.events.publish('login');
      } else {
      }
    }, err => {
      console.error('ERROR', JSON.stringify(err));
    });

    return seq;
  }

  signup(accountInfo: any) {
    return new Promise((resolve, reject)=>{
      let seq = this.api.post('user/signup', accountInfo).share();

      seq.subscribe((res: any) => {
        // If the API returned a successful response, mark the user as logged in
        if (!res.error) {
          this.settings.setValue('user', accountInfo);
          this.setupData(res);
          resolve(res);
        } else {
          reject(res);
        }
      }, err => {
        console.error('ERROR', err);
        reject(err);
      });
    });
    //return seq;
  }

  updateProfile(accountInfo: any) {
    let seq = this.api.post('user/update-profile', accountInfo).share();

    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }

  updateProfileImage(data: any) {
    let seq = this.api.post('user/update-picture', data).share();

    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }

  logout() {
    this.USER = null;
    this.token = null;
    this.settings.setValue('user', null);
    this.events.publish('logout');
  }

  setupData(resp) {
    this.USER = <UserProfile>resp.profile;
    //this.USER.profile = resp.profile;
    this.token = resp.token;
  }
}



export class UserProfile {
  token: String
  city: String
  country: String
  created_at: String
  district: String
  dob: String
  firstname: String
  gender: String
  id: String
  lastname: String
  looking_for: String
  map_location: String
  phone: String
  profile_image:String
  updated_at:String
  user_id:String

  constructor(){}
}