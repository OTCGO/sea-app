import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, App, ViewController, Platform } from 'ionic-angular';
import { Store } from '@ngrx/store'
import { TranslateService } from '@ngx-translate/core'
import { RootState } from '../../store/reducers'
import { SettingsActions } from '../../store/actions'
import { SettingsSelectors } from '../../store/selectors'
import { NativeStorage } from '@ionic-native/native-storage'
import { WalletActions } from '../../store/actions'
import { version } from '@app/env'
import { Clipboard } from '@ionic-native/clipboard'
import { NotificationProvider } from '../../providers/notification.provider'

/**
 * Generated class for the AddressListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'AddressList',
  segment: 'addressList'
})
@Component({
  selector: 'page-address-list',
  templateUrl: 'address-list.html',
})
export class AddressListPage implements OnInit {
  private addressList;

  constructor(private navCtrl: NavController,
    private nativeStorage: NativeStorage,
    public translateService: TranslateService,
    private viewCtrl: ViewController,
    private appCtrl: App,
    private clipboard: Clipboard,
    private store: Store<RootState>,
    private platform: Platform,
    private np: NotificationProvider, ) {
  }

  async ngOnInit() {
    try {

      this.addressList = await this.nativeStorage.getItem('addressList')
      console.log('this.addressList', this.addressList)

    } catch (error) {
      console.log('error', error)

    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddressListPage');
  }

  copy(value) {
    console.log('this.platform', this.platform)
    // console.log('element', element)
    if (this.platform.is('mobileweb')) {
      try {
        const el = document.createElement('textarea')
        el.value = value
        document.body.appendChild(el)
        el.select()
        document.execCommand('copy')
        document.body.removeChild(el)

        return this.np.emit({ message: `copy successful` })
      } catch (err) {
        console.log('unable to copy', err)
      }
    }

    let copyText
    this.translateService.get('CW.BACKUP.success').subscribe(data => {
      copyText = data
    })


    this.clipboard.copy(value).then(() => this.np.emit({ message: copyText })).catch()
  }

  async btnSelected(item) {


    this.store.dispatch(new WalletActions.RemoveAccount())
    this.viewCtrl.dismiss()

    await this.nativeStorage.setItem('account', { encrypted: item.encrypted, address: item.address })

    this.appCtrl.getRootNav().setRoot('Login')

  }

}
