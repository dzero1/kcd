import { Component, ViewChild, ElementRef, Renderer } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { User, Api } from '../../providers';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  Environment
} from '@ionic-native/google-maps';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder';
import { UserProfile } from '../../providers/user/user';
import { DomSanitizer } from '@angular/platform-browser';

/**
 * Generated class for the ProfileUpdatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile-update',
  templateUrl: 'profile-update.html',
})
export class ProfileUpdatePage {

  account:UserProfile = new UserProfile();

  profile_pic:string;

  apiroot:string;
  from:string;

  errorString:string;
  successSignupString:string;
  successString:string;

  map: GoogleMap;

  @ViewChild('fileInput') fileInput:ElementRef;

  @ViewChild('map_canvas') map_canvas:HTMLElement;

  constructor(public navCtrl: NavController,
    public navParams:NavParams,
    public user: User,
    private renderer:Renderer,
    api:Api,
    public toastCtrl: ToastController,
    public sanitizer: DomSanitizer,
    public translateService: TranslateService,
    private nativeGeocoder: NativeGeocoder) 
  {

    if (navParams.get('from')) this.from = navParams.get('from');

    this.translateService.get('PROFILE_UPDATE_ERROR').subscribe((value) => {
      this.errorString = value;
    });

    this.translateService.get('SIGNUP_SUCCESS').subscribe((value) => {
      this.successSignupString = value;
    });

    this.translateService.get('PROFILE_UPDATED').subscribe((value) => {
      this.successString = value;
    });

    this.apiroot = api.url;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfileUpdatePage');

    if (!this.from){
      this.account = this.user.USER;
      this.account.token = this.user.token;
    }

    this.profile_pic = this.apiroot + '/user/picture?image=' + this.account.profile_image;
  }

  attachmentInput;
  openFileDialog(){
    let event = new MouseEvent('click', {bubbles: true});
    this.renderer.invokeElementMethod(this.fileInput.nativeElement, 'dispatchEvent', [event]);
    this.attachmentInput = this.fileInput.nativeElement;
  }
  imageFilePath_change($ev){
    let filesFormData = new FormData();
    filesFormData.append('token', this.user.token);
    if (this.attachmentInput.files !== undefined && this.attachmentInput.files[0]) {
      const file = this.attachmentInput.files[0]
      filesFormData.append('file[]', file, file.name);

      var reader = new FileReader();
      reader.onload = (e:any)=>{
        this.profile_pic = e.target.result
      };
      reader.readAsDataURL(this.attachmentInput.files[0]);
    }

    this.user.updateProfileImage(filesFormData).subscribe((resp:any) => {
      if (!resp.error){
        this.profile_pic = this.apiroot + '/user/picture?image=' + resp.profile_image;
        this.user.USER.profile_image = resp.profile_image;
        this.account = this.user.USER;
      } else {
        let toast = this.toastCtrl.create({
          message: this.errorString,
          duration: 3000,
          position: 'top'
        });
        toast.present();
        this.navCtrl.push('LookPage');
      }
      console.log(resp);
    });
  }

  updateProfile(){
    // Attempt to login in through our User service
    this.account.token = this.user.token;
    this.user.updateProfile(this.account).subscribe((resp:any) => {
      if (!resp.error){
        if (this.from == 'signup'){
          let toast = this.toastCtrl.create({
            message: this.successSignupString,
            duration: 3000,
            position: 'top'
          });
          toast.present();
          this.navCtrl.push('LookPage');
        } else {
          let toast = this.toastCtrl.create({
            message: this.successString,
            duration: 3000,
            position: 'top'
          });
          toast.present();
          this.navCtrl.pop();
        }
        
      } else {
        let toast = this.toastCtrl.create({
          message: this.errorString,
          duration: 3000,
          position: 'top'
        });
        toast.present();        
      }
    }, (err) => {
      // Unable to update data
      let toast = this.toastCtrl.create({
        message: this.errorString,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
  }

  locationString:string;
  mapUrl:any;
  loadMap() {

    let location = [];
    if (this.account.city) location.push(this.account.city);
    if (this.account.district) location.push(this.account.district);
    if (this.account.country) location.push(this.account.country);

    this.locationString = location.join('%2C');

    this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl('https://maps.google.com/maps?q='+this.locationString+'&t=&z=15&ie=UTF8&iwloc=&output=embed');

    return;

    // This code is necessary for browser
    Environment.setEnv({
      'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyBdAt3A42gQyqvvEGDiuSW8HBqaSXr525s',
      'API_KEY_FOR_BROWSER_DEBUG': 'AIzaSyBdAt3A42gQyqvvEGDiuSW8HBqaSXr525s'
    });

    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
    };

    /* 
    let location = [];
    if (this.account.country) location.push(this.account.country);
    if (this.account.district) location.push(this.account.district);
    if (this.account.city) location.push(this.account.city);

    let locationString = "Mengo";
    //locationString = location.join(','); */

    this.nativeGeocoder.forwardGeocode('Berlin', options)
    .then((coordinates: NativeGeocoderForwardResult[]) => {
      console.log('The coordinates are latitude=' + coordinates[0].latitude + ' and longitude=' + coordinates[0].longitude);

      this.map = GoogleMaps.create(this.map_canvas, {
        camera: {
          target: {
            lat: coordinates[0].latitude,
            lng: coordinates[0].longitude
          },
          zoom: 18,
          tilt: 30
        }
      });

    })
    .catch((error: any) => {
      console.log("nativeGeocoder Error : " + error)
    });

    /* let marker: Marker = this.map.addMarkerSync({
      title: 'Ionic',
      icon: 'blue',
      animation: 'DROP',
      position: {
        lat: 43.0741904,
        lng: -89.3809802
      }
    });
    marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
      alert('clicked');
    }); */
  }
  
}
