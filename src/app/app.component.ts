import { Component, ViewChild, ElementRef } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { TranslateService } from '@ngx-translate/core';
import { Config, Nav, Platform, Events, MenuController } from 'ionic-angular';

import { FirstRunPage } from '../pages';
import { Settings, Api } from '../providers';
import { Storage } from '@ionic/storage';
import { User } from '../providers/user/user';

@Component({
  //templateUrl: 'app.html',
  template: `
    <ion-menu [content]="content" #mainMenu id="menu" *ngIf="_user != undefined">
      <ion-header>
        <ion-toolbar>
          <ion-title>
            <ion-title class="app-title">{{ 'APP_TITLE' | translate }}</ion-title>
          </ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-content id="side-menu">
        <ion-list id="menu-list">
          <ion-item color="none" id="menu-list-item1" (click)="openProfile()">
            <ion-thumbnail item-left>
              <div class="profile-image" [style.backgroundImage]=" 'url(' + apiroot + '/user/picture?image=' + _user.profile_image + ')' "></div>
            </ion-thumbnail>
            <h2>{{_user.firstname}} {{_user.lastname}}</h2>
          </ion-item>
        </ion-list>
        <button id="close-button" ion-button color="light" block icon-left style="text-align:left;" (click)="logout()">
          <ion-icon name="power"></ion-icon>Logout
        </button>
      </ion-content>
    </ion-menu>

    <ion-nav #content [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage = 'WelcomePage';

  @ViewChild(Nav) nav: Nav;
  @ViewChild('mainMenu') mainMenu: ElementRef;

  pages: any[] = []
  _user;
  apiroot:string;

  constructor(private translate: TranslateService, 
    platform: Platform, 
    private settings: Settings, 
    private user: User, 
    private config: Config, 
    private statusBar: StatusBar, 
    private api:Api,
    private events:Events,
    public menuCtrl: MenuController,
    private splashScreen: SplashScreen) {
    
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.settings.load();

      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    this.events.subscribe('login', ()=>{
      this._user = this.user.USER;
      this.rootPage = 'LookPage';
    });
    this.events.subscribe('logout', ()=>{
      this.nav.setRoot('WelcomePage');
      this.menuCtrl.close('menu').then(()=>{
        this._user = undefined;
      })
    });
    this.apiroot = api.url;

    this.initTranslate();
  }

  initTranslate() {
    // Set the default language for translation strings, and the current language.
    this.translate.setDefaultLang('en');
    const browserLang = this.translate.getBrowserLang();

    if (browserLang) {
      if (browserLang === 'zh') {
        const browserCultureLang = this.translate.getBrowserCultureLang();

        if (browserCultureLang.match(/-CN|CHS|Hans/i)) {
          this.translate.use('zh-cmn-Hans');
        } else if (browserCultureLang.match(/-TW|CHT|Hant/i)) {
          this.translate.use('zh-cmn-Hant');
        }
      } else {
        this.translate.use(this.translate.getBrowserLang());
      }
    } else {
      this.translate.use('en'); // Set your language here
    }

    this.translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
      this.config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  logout(){
    this.user.logout();
  }

  openProfile(){
    this.menuCtrl.close('menu');
    this.nav.push('ProfileUpdatePage');
  }
}
