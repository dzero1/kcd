import { Component, ViewChild, ElementRef, Renderer } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { User, Api, Settings } from '../../providers';
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


  public allCountries:Array<any> = [ 
    {name: 'Afghanistan', code: 'AF'}, 
    {name: 'Åland Islands', code: 'AX'}, 
    {name: 'Albania', code: 'AL'}, 
    {name: 'Algeria', code: 'DZ'}, 
    {name: 'American Samoa', code: 'AS'}, 
    {name: 'AndorrA', code: 'AD'}, 
    {name: 'Angola', code: 'AO'}, 
    {name: 'Anguilla', code: 'AI'}, 
    {name: 'Antarctica', code: 'AQ'}, 
    {name: 'Antigua and Barbuda', code: 'AG'}, 
    {name: 'Argentina', code: 'AR'}, 
    {name: 'Armenia', code: 'AM'}, 
    {name: 'Aruba', code: 'AW'}, 
    {name: 'Australia', code: 'AU'}, 
    {name: 'Austria', code: 'AT'}, 
    {name: 'Azerbaijan', code: 'AZ'}, 
    {name: 'Bahamas', code: 'BS'}, 
    {name: 'Bahrain', code: 'BH'}, 
    {name: 'Bangladesh', code: 'BD'}, 
    {name: 'Barbados', code: 'BB'}, 
    {name: 'Belarus', code: 'BY'}, 
    {name: 'Belgium', code: 'BE'}, 
    {name: 'Belize', code: 'BZ'}, 
    {name: 'Benin', code: 'BJ'}, 
    {name: 'Bermuda', code: 'BM'}, 
    {name: 'Bhutan', code: 'BT'}, 
    {name: 'Bolivia', code: 'BO'}, 
    {name: 'Bosnia and Herzegovina', code: 'BA'}, 
    {name: 'Botswana', code: 'BW'}, 
    {name: 'Bouvet Island', code: 'BV'}, 
    {name: 'Brazil', code: 'BR'}, 
    {name: 'British Indian Ocean Territory', code: 'IO'}, 
    {name: 'Brunei Darussalam', code: 'BN'}, 
    {name: 'Bulgaria', code: 'BG'}, 
    {name: 'Burkina Faso', code: 'BF'}, 
    {name: 'Burundi', code: 'BI'}, 
    {name: 'Cambodia', code: 'KH'}, 
    {name: 'Cameroon', code: 'CM'}, 
    {name: 'Canada', code: 'CA'}, 
    {name: 'Cape Verde', code: 'CV'}, 
    {name: 'Cayman Islands', code: 'KY'}, 
    {name: 'Central African Republic', code: 'CF'}, 
    {name: 'Chad', code: 'TD'}, 
    {name: 'Chile', code: 'CL'}, 
    {name: 'China', code: 'CN'}, 
    {name: 'Christmas Island', code: 'CX'}, 
    {name: 'Cocos (Keeling) Islands', code: 'CC'}, 
    {name: 'Colombia', code: 'CO'}, 
    {name: 'Comoros', code: 'KM'}, 
    {name: 'Congo', code: 'CG'}, 
    {name: 'Congo, The Democratic Republic of the', code: 'CD'}, 
    {name: 'Cook Islands', code: 'CK'}, 
    {name: 'Costa Rica', code: 'CR'}, 
    {name: 'Cote D\'Ivoire', code: 'CI'}, 
    {name: 'Croatia', code: 'HR'}, 
    {name: 'Cuba', code: 'CU'}, 
    {name: 'Cyprus', code: 'CY'}, 
    {name: 'Czech Republic', code: 'CZ'}, 
    {name: 'Denmark', code: 'DK'}, 
    {name: 'Djibouti', code: 'DJ'}, 
    {name: 'Dominica', code: 'DM'}, 
    {name: 'Dominican Republic', code: 'DO'}, 
    {name: 'Ecuador', code: 'EC'}, 
    {name: 'Egypt', code: 'EG'}, 
    {name: 'El Salvador', code: 'SV'}, 
    {name: 'Equatorial Guinea', code: 'GQ'}, 
    {name: 'Eritrea', code: 'ER'}, 
    {name: 'Estonia', code: 'EE'}, 
    {name: 'Ethiopia', code: 'ET'}, 
    {name: 'Falkland Islands (Malvinas)', code: 'FK'}, 
    {name: 'Faroe Islands', code: 'FO'}, 
    {name: 'Fiji', code: 'FJ'}, 
    {name: 'Finland', code: 'FI'}, 
    {name: 'France', code: 'FR'}, 
    {name: 'French Guiana', code: 'GF'}, 
    {name: 'French Polynesia', code: 'PF'}, 
    {name: 'French Southern Territories', code: 'TF'}, 
    {name: 'Gabon', code: 'GA'}, 
    {name: 'Gambia', code: 'GM'}, 
    {name: 'Georgia', code: 'GE'}, 
    {name: 'Germany', code: 'DE'}, 
    {name: 'Ghana', code: 'GH'}, 
    {name: 'Gibraltar', code: 'GI'}, 
    {name: 'Greece', code: 'GR'}, 
    {name: 'Greenland', code: 'GL'}, 
    {name: 'Grenada', code: 'GD'}, 
    {name: 'Guadeloupe', code: 'GP'}, 
    {name: 'Guam', code: 'GU'}, 
    {name: 'Guatemala', code: 'GT'}, 
    {name: 'Guernsey', code: 'GG'}, 
    {name: 'Guinea', code: 'GN'}, 
    {name: 'Guinea-Bissau', code: 'GW'}, 
    {name: 'Guyana', code: 'GY'}, 
    {name: 'Haiti', code: 'HT'}, 
    {name: 'Heard Island and Mcdonald Islands', code: 'HM'}, 
    {name: 'Holy See (Vatican City State)', code: 'VA'}, 
    {name: 'Honduras', code: 'HN'}, 
    {name: 'Hong Kong', code: 'HK'}, 
    {name: 'Hungary', code: 'HU'}, 
    {name: 'Iceland', code: 'IS'}, 
    {name: 'India', code: 'IN'}, 
    {name: 'Indonesia', code: 'ID'}, 
    {name: 'Iran, Islamic Republic Of', code: 'IR'}, 
    {name: 'Iraq', code: 'IQ'}, 
    {name: 'Ireland', code: 'IE'}, 
    {name: 'Isle of Man', code: 'IM'}, 
    {name: 'Israel', code: 'IL'}, 
    {name: 'Italy', code: 'IT'}, 
    {name: 'Jamaica', code: 'JM'}, 
    {name: 'Japan', code: 'JP'}, 
    {name: 'Jersey', code: 'JE'}, 
    {name: 'Jordan', code: 'JO'}, 
    {name: 'Kazakhstan', code: 'KZ'}, 
    {name: 'Kenya', code: 'KE'}, 
    {name: 'Kiribati', code: 'KI'}, 
    {name: 'Korea, Democratic People\'S Republic of', code: 'KP'}, 
    {name: 'Korea, Republic of', code: 'KR'}, 
    {name: 'Kuwait', code: 'KW'}, 
    {name: 'Kyrgyzstan', code: 'KG'}, 
    {name: 'Lao People\'S Democratic Republic', code: 'LA'}, 
    {name: 'Latvia', code: 'LV'}, 
    {name: 'Lebanon', code: 'LB'}, 
    {name: 'Lesotho', code: 'LS'}, 
    {name: 'Liberia', code: 'LR'}, 
    {name: 'Libyan Arab Jamahiriya', code: 'LY'}, 
    {name: 'Liechtenstein', code: 'LI'}, 
    {name: 'Lithuania', code: 'LT'}, 
    {name: 'Luxembourg', code: 'LU'}, 
    {name: 'Macao', code: 'MO'}, 
    {name: 'Macedonia, The Former Yugoslav Republic of', code: 'MK'}, 
    {name: 'Madagascar', code: 'MG'}, 
    {name: 'Malawi', code: 'MW'}, 
    {name: 'Malaysia', code: 'MY'}, 
    {name: 'Maldives', code: 'MV'}, 
    {name: 'Mali', code: 'ML'}, 
    {name: 'Malta', code: 'MT'}, 
    {name: 'Marshall Islands', code: 'MH'}, 
    {name: 'Martinique', code: 'MQ'}, 
    {name: 'Mauritania', code: 'MR'}, 
    {name: 'Mauritius', code: 'MU'}, 
    {name: 'Mayotte', code: 'YT'}, 
    {name: 'Mexico', code: 'MX'}, 
    {name: 'Micronesia, Federated States of', code: 'FM'}, 
    {name: 'Moldova, Republic of', code: 'MD'}, 
    {name: 'Monaco', code: 'MC'}, 
    {name: 'Mongolia', code: 'MN'}, 
    {name: 'Montserrat', code: 'MS'}, 
    {name: 'Morocco', code: 'MA'}, 
    {name: 'Mozambique', code: 'MZ'}, 
    {name: 'Myanmar', code: 'MM'}, 
    {name: 'Namibia', code: 'NA'}, 
    {name: 'Nauru', code: 'NR'}, 
    {name: 'Nepal', code: 'NP'}, 
    {name: 'Netherlands', code: 'NL'}, 
    {name: 'Netherlands Antilles', code: 'AN'}, 
    {name: 'New Caledonia', code: 'NC'}, 
    {name: 'New Zealand', code: 'NZ'}, 
    {name: 'Nicaragua', code: 'NI'}, 
    {name: 'Niger', code: 'NE'}, 
    {name: 'Nigeria', code: 'NG'}, 
    {name: 'Niue', code: 'NU'}, 
    {name: 'Norfolk Island', code: 'NF'}, 
    {name: 'Northern Mariana Islands', code: 'MP'}, 
    {name: 'Norway', code: 'NO'}, 
    {name: 'Oman', code: 'OM'}, 
    {name: 'Pakistan', code: 'PK'}, 
    {name: 'Palau', code: 'PW'}, 
    {name: 'Palestinian Territory, Occupied', code: 'PS'}, 
    {name: 'Panama', code: 'PA'}, 
    {name: 'Papua New Guinea', code: 'PG'}, 
    {name: 'Paraguay', code: 'PY'}, 
    {name: 'Peru', code: 'PE'}, 
    {name: 'Philippines', code: 'PH'}, 
    {name: 'Pitcairn', code: 'PN'}, 
    {name: 'Poland', code: 'PL'}, 
    {name: 'Portugal', code: 'PT'}, 
    {name: 'Puerto Rico', code: 'PR'}, 
    {name: 'Qatar', code: 'QA'}, 
    {name: 'Reunion', code: 'RE'}, 
    {name: 'Romania', code: 'RO'}, 
    {name: 'Russian Federation', code: 'RU'}, 
    {name: 'RWANDA', code: 'RW'}, 
    {name: 'Saint Helena', code: 'SH'}, 
    {name: 'Saint Kitts and Nevis', code: 'KN'}, 
    {name: 'Saint Lucia', code: 'LC'}, 
    {name: 'Saint Pierre and Miquelon', code: 'PM'}, 
    {name: 'Saint Vincent and the Grenadines', code: 'VC'}, 
    {name: 'Samoa', code: 'WS'}, 
    {name: 'San Marino', code: 'SM'}, 
    {name: 'Sao Tome and Principe', code: 'ST'}, 
    {name: 'Saudi Arabia', code: 'SA'}, 
    {name: 'Senegal', code: 'SN'}, 
    {name: 'Serbia and Montenegro', code: 'CS'}, 
    {name: 'Seychelles', code: 'SC'}, 
    {name: 'Sierra Leone', code: 'SL'}, 
    {name: 'Singapore', code: 'SG'}, 
    {name: 'Slovakia', code: 'SK'}, 
    {name: 'Slovenia', code: 'SI'}, 
    {name: 'Solomon Islands', code: 'SB'}, 
    {name: 'Somalia', code: 'SO'}, 
    {name: 'South Africa', code: 'ZA'}, 
    {name: 'South Georgia and the South Sandwich Islands', code: 'GS'}, 
    {name: 'Spain', code: 'ES'}, 
    {name: 'Sri Lanka', code: 'LK'}, 
    {name: 'Sudan', code: 'SD'}, 
    {name: 'Suriname', code: 'SR'}, 
    {name: 'Svalbard and Jan Mayen', code: 'SJ'}, 
    {name: 'Swaziland', code: 'SZ'}, 
    {name: 'Sweden', code: 'SE'}, 
    {name: 'Switzerland', code: 'CH'}, 
    {name: 'Syrian Arab Republic', code: 'SY'}, 
    {name: 'Taiwan, Province of China', code: 'TW'}, 
    {name: 'Tajikistan', code: 'TJ'}, 
    {name: 'Tanzania, United Republic of', code: 'TZ'}, 
    {name: 'Thailand', code: 'TH'}, 
    {name: 'Timor-Leste', code: 'TL'}, 
    {name: 'Togo', code: 'TG'}, 
    {name: 'Tokelau', code: 'TK'}, 
    {name: 'Tonga', code: 'TO'}, 
    {name: 'Trinidad and Tobago', code: 'TT'}, 
    {name: 'Tunisia', code: 'TN'}, 
    {name: 'Turkey', code: 'TR'}, 
    {name: 'Turkmenistan', code: 'TM'}, 
    {name: 'Turks and Caicos Islands', code: 'TC'}, 
    {name: 'Tuvalu', code: 'TV'}, 
    {name: 'Uganda', code: 'UG'}, 
    {name: 'Ukraine', code: 'UA'}, 
    {name: 'United Arab Emirates', code: 'AE'}, 
    {name: 'United Kingdom', code: 'GB'}, 
    {name: 'United States', code: 'US'}, 
    {name: 'United States Minor Outlying Islands', code: 'UM'}, 
    {name: 'Uruguay', code: 'UY'}, 
    {name: 'Uzbekistan', code: 'UZ'}, 
    {name: 'Vanuatu', code: 'VU'}, 
    {name: 'Venezuela', code: 'VE'}, 
    {name: 'Viet Nam', code: 'VN'}, 
    {name: 'Virgin Islands, British', code: 'VG'}, 
    {name: 'Virgin Islands, U.S.', code: 'VI'}, 
    {name: 'Wallis and Futuna', code: 'WF'}, 
    {name: 'Western Sahara', code: 'EH'}, 
    {name: 'Yemen', code: 'YE'}, 
    {name: 'Zambia', code: 'ZM'}, 
    {name: 'Zimbabwe', code: 'ZW'} 
  ]

  public uganda_districts:Array<string> = ["Abim","Adjumani","Agago","Alebtong","Amolatar","Amudat","Amuria","Amuru","Apac","Arua","Budaka","Bududa","Bugiri","Bugweri","Buhweju","Buikwe","Bukedea","Bukomansimbi","Bukwa","Bulambuli","Buliisa","Bundibugyo","Bunyangabu","Bushenyi","Busia","Butaleja","Butambala","Butebo","Buvuma","Buyende","Dokolo","Gomba","Gulu","Hoima","Ibanda","Iganga","Isingiro","Jinja","Kaabong","Kabale","Kabarole","Kaberamaido","Kagadi","Kagadi","Kakumiro","Kalangala","Kaliro","Kalungu","Kampala","Kamuli","Kamwenge","Kanungu","Kapchorwa","Kapelebyong","Karenga","Kasanda","Kasese","Katakwi","Kayunga","Kazo","Kibaale","Kiboga","Kibuku","Kibuube","Kiruhura","Kiryandongo","Kisoro","Kitagwenda","Kitgum","Koboko","Kole","Kotido","Kumi","Kwania","Kween","Kyankwanzi","Kyegegwa","Kyenjojo","Kyotera","Lamwo","Lira","Lusot","Luuka","Luweero","Lwengo","Lyantonde","Madi-Okollo","Manafwa","Maracha","Masaka","Masindi","Mayuge","Mbale","Mbarara","Mitooma","Mityana","Moroto","Moyo","Mpigi","Mubende","Mukono","Nabilatuk","Nakapiripirit","Nakaseke","Nakasongola","Namayingo","Namisindwa","Namisindwa","Namutumba","Napak","Nebbi","Ngora","Ntoroko","Ntungamo","Nwoya","Obongi","Omoro","Otuke","Oyam","Pader","Pakwach","Pallisa","Rakai","Rubanda","Rubirizi","Rukiga","Rukungiri","Rwampara","Serere","Sheema","Sironko","Soroti","Ssembabule","Tororo","Wakiso","Yumbe","Zombo"];


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
    private nativeGeocoder: NativeGeocoder
    ) 
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
    /* Environment.setEnv({
      'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyBdAt3A42gQyqvvEGDiuSW8HBqaSXr525s',
      'API_KEY_FOR_BROWSER_DEBUG': 'AIzaSyBdAt3A42gQyqvvEGDiuSW8HBqaSXr525s'
    });

    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
    }; */

    /* this.nativeGeocoder.forwardGeocode('Berlin', options)
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
    }); */

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
