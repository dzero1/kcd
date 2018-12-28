import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Items } from '../../providers/items/items';
import { Observable } from 'rxjs';
import { Api, User } from '../../providers';

/**
 * Generated class for the MainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {

  currentItems:any = [];
  look:any = {};
  apiroot:string;
  _user:any;

  showFilters:boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public items:Items, private api:Api, private user:User) {
    if (navParams.get('look')) this.look = navParams.get('look');
    this.apiroot = this.api.url;
    this._user = this.user.USER;
  }

  ionViewDidLoad() {
    let query:Observable<any>;
    query = this.items.query(this.look);

    query.subscribe(r => {
      if (r && !r.error && r.people && r.people.length > 0) this.currentItems = r.people;
    })
  }

  openItem(item:any){
    //if (this._user){
      this.navCtrl.push('ProfileViewPage', {"item": item});
    //} else {
      //this.navCtrl.push('LoginPage');
    //}
  }

  back(){
    this.navCtrl.pop();
  }

  toggleFilters(){
    this.showFilters = !this.showFilters;
  }

  filter(){
    
  }
}
