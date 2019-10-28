import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, ItemSliding, AlertController, LoadingController, NavParams, App, ViewController, Platform } from 'ionic-angular';
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
import { getWif } from '../../shared/utils'
import { wallet } from '../../libs/neon'

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

  chats: any[];
  sliding: ItemSliding

  constructor(private navCtrl: NavController,
    private alertCtrl: AlertController,
    private nativeStorage: NativeStorage,
    public translateService: TranslateService,
    private viewCtrl: ViewController,
    private appCtrl: App,
    private clipboard: Clipboard,
    private store: Store<RootState>,
    private platform: Platform,
    private loadingCtrl: LoadingController,
    private np: NotificationProvider, ) {
    this.chats = [
      {
        img: './assets/avatar-cher.png',
        name: 'Cher',
        message: 'Ugh. As if.',
        time: '9:38 pm'
      }, {
        img: './assets/avatar-dionne.png',
        name: 'Dionne',
        message: 'Mr. Hall was way harsh.',
        time: '8:59 pm'
      }, {
        img: './assets/avatar-murray.png',
        name: 'Murray',
        message: 'Excuse me, "Ms. Dione."',
        time: 'Wed'
      }];

  }

  async ngOnInit() {
    try {

      this.addressList = await this.nativeStorage.getItem('addressList')
      console.log('this.addressList', this.addressList)
      this.addressList.sort((a, b) => {
        return a.isDefault ? -1 : 1;
      })

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

  showPrompt(msg) {
    const message = msg.message || msg
    const alert = this.alertCtrl.create({ message })
    alert.present()

    setTimeout(() => {
      alert.dismiss().catch(() => { })
    }, 1000)
  }

  async btnSelected(item) {
    // if (item.isDefault) {
    //   return
    // }


    // this.store.dispatch(new WalletActions.RemoveAccount())
    // this.viewCtrl.dismiss()

    // await this.nativeStorage.setItem('account', { encrypted: item.encrypted, address: item.address })

    // this.appCtrl.getRootNav().setRoot('Login')

    let alert = this.alertCtrl.create({
      title: '密码',
      inputs: [
        {
          name: 'passphrase',
          placeholder: '输入密码',
          type: 'password'
        }
      ],
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: '确定',
          handler: ({ passphrase }) => {
            const loading = this.loadingCtrl.create()
            loading.present().then(() => {
              if (!passphrase || passphrase === '' || passphrase.length < 8 || passphrase.length > 20) return false

              getWif(item.encrypted, passphrase).then((wif: any) => {
                const tempAcct = new wallet.Account(wif)

                const { address } = tempAcct

                const acct = new wallet.Account({
                  // wif,
                  address,
                  // label: address,
                  key: item.encrypted,
                  isDefault: true
                })

                this.store.dispatch(new WalletActions.RemoveAccount())

                this.store.dispatch(new WalletActions.AddAccount(acct))
                this.store.dispatch(new WalletActions.SaveWif({ wif: wif }))

                this.nativeStorage.setItem('account', item)
                // this.navCtrl.push('Tabs')



                this.addressList.forEach(element => {
                  element.isDefault = false
                  if (element.address === address) {
                    element.isDefault = true
                  }
                });

                this.nativeStorage.setItem('addressList', this.addressList)

                loading.dismiss().catch(() => { }).catch(() => { })
                this.viewCtrl.dismiss()
                this.appCtrl.getRootNav().setRoot('Tabs')


              }).catch((error) => {
                loading.dismiss().catch(() => { }).catch(() => { })
                console.log('error', error)
                this.showPrompt('密码错误，请重新输入')
              })
            })
          }
        }
      ]
    });
    await alert.present();

    // const wif: any = await getWif(encrypted, passphrase)
    // // console.timeEnd('getWif')

    // const tempAcct = new wallet.Account(wif)

    // const { address } = tempAcct

    // const acct = new wallet.Account({
    //   // wif,
    //   address,
    //   // label: address,
    //   key: encrypted,
    //   isDefault: true
    // })


    // // console.log('acct', acct)

    // loading.dismiss().catch(() => { })
    // this.store.dispatch(new WalletActions.AddAccount(acct))
    // this.store.dispatch(new WalletActions.SaveWif({ wif: wif }))

  }


  async edit(index, slidingItem: ItemSliding) {
    let alert = this.alertCtrl.create({
      title: '编辑',
      inputs: [
        {
          name: 'username',
          placeholder: '钱包名称'
        }
      ],
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: '确定',
          handler: data => {
            console.log('index', index)
            this.addressList[index].label = data.username
            console.log('this.addressList', this.addressList);
            this.nativeStorage.setItem('addressList', this.addressList)

            this.close(slidingItem)
            return true;
          }
        }
      ]
    });
    alert.present();


  }

  async deleteAddress(item, slidingItem: ItemSliding) {
    if (item.isDefault) {
      this.showPrompt('当前钱包正在使用。')
      return
    }

    this.addressList = this.addressList.filter(function (i) {
      return i.address != item.address
    });

    this.nativeStorage.setItem('addressList', this.addressList)
    this.close(slidingItem)
  }

  async close(slidingItem: ItemSliding) {
    if (slidingItem) {
      try {
        slidingItem.close();
      } catch (error) {

      }

    }

  }

  closeSliding() {
    if (this.sliding) {
      try {
        this.sliding.close();
      } catch (error) {

      }

    }

  }

  ondrag(event, slidingCase) {
    this.sliding = slidingCase
    // let percent = item.getSlidingPercent();
    // if (percent < 0) {
    //   // positive
    //   console.log('left side');
    // }

  }
}
