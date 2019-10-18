import {
  Component,
  OnInit
} from '@angular/core'
import { Store } from '@ngrx/store'
import {
  IonicPage, LoadingController,
  NavController,
  NavParams
} from 'ionic-angular'
import { LoadingProvider, NotificationProvider } from '../../providers'
import { nep5Wallet } from '../../shared/userWallet'
import { WalletActions, AuthActions } from '../../store/actions'
import { RootState } from '../../store/reducers'
import { AuthSelectors } from '../../store/selectors'
import { decryptAsync } from '../../shared/utils'
import { TranslateService } from '@ngx-translate/core'
import { wallet } from '../../libs/neon'
import { NativeStorage } from '@ionic-native/native-storage'



@IonicPage({
  name: 'Login',
  segment: 'login'
})
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage implements OnInit {
  translationPrefix = 'LOGIN.'
  private account
  private isSwitch: boolean
  private myWorker
  constructor(
    private nativeStorage: NativeStorage,
    public navCtrl: NavController,
    public navParams: NavParams,
    private np: NotificationProvider,
    private lp: LoadingProvider,
    private ts: TranslateService,
    private loadingCtrl: LoadingController,
    private store: Store<RootState>,
  ) {
    // const myWorker = new Worker('../../assets/workers/worker.js')

    // myWorker.onmessage = (msg) => {
    //   console.log('myWorker', msg)
    // }

    // myWorker.postMessage('main')


  }

  ngOnInit() {
    // this.store.select(AuthSelectors.getError).subscribe(error => {
    //   if (error) {
    //     console.log()
    //     this.ts.get(this.translationPrefix + 'nep2_passphrase_error').subscribe(data => {
    //       this.np.emit(data)
    //     })

    //   }
    // })


    this.store.select(AuthSelectors.getLoading).subscribe(bool => bool && this.lp.emit(bool))


  }

  NEP5Login = file => this.store.dispatch(new AuthActions.Login(file))


  wifLogin(keyValue) {
    // return keyValue === 'test'
    // 	? this.NEP5Login(nep5Wallet)
    // 	: this.store.dispatch(new AuthActions.LoginWif(keyValue))\

    // this.store.dispatch(new AuthActions.LoginWif(keyValue))
    // const loading = this.loadingCtrl.create()
    // loading.present()
    try {
      // loading.dismiss().catch(() => {}).catch(() => {})
      this.store.dispatch(new AuthActions.LoginWif(keyValue))

    } catch (error) {
      // loading.dismiss().catch(() => {}).catch(() => {})
    }
  }

  oldWalletLogin = ({ oldWallet, passphrase }) => {
    // const loading = this.loadingCtrl.create()
    // loading.present()
    try {

      // loading.dismiss().catch(() => {}).catch(() => {})
      this.store.dispatch(new AuthActions.LoginOldWallet({ oldWallet, passphrase }))

    } catch (error) {

      // loading.dismiss().catch(() => {}).catch(() => {})
      console.log('error', error)
    }

  }

  switchAccount() {
    console.log('this.isSwitch')
    this.store.dispatch(new WalletActions.RemoveAccount())
    this.isSwitch = true
    // clear all storage
    // this.nativeStorage.clear()
    this.nativeStorage.remove('account')
    console.log('this.isSwitch', this.isSwitch)
  }

  async NEP2Login({ encrypted, passphrase }) {
    // const loading = this.loadingCtrl.create()
    // await loading.present()
    // try {
    //   if (passphrase === '') {
    //     return
    //   }

    //   const start = new Date().getTime()




    //   const wif = wallet.decrypt(encrypted, passphrase)
    //   // const wif = await decryptAsync(encrypted, passphrase)
    //   // const wif = await wallet.decryptAsync(encrypted, passphrase)
    //   //  const acct = new wallet.Account(wif)
    //   const end = new Date().getTime()
    //   console.log('NEP2Login', end - start)


    //   const tempAcct = new wallet.Account(wif)

    //   const { address } = tempAcct

    //   const acct = new wallet.Account({
    //     address,
    //     label: address,
    //     key: encrypted,
    //     isDefault: true
    //   })


    //   loading.dismiss().catch(() => { })
    //   this.store.dispatch(new WalletActions.AddAccount(acct))

    //   this.nativeStorage.setItem('account', { encrypted })


    //   // this.navCtrl.setRoot('Tabs')
    //   this.navCtrl.push('Tabs')
    // } catch (error) {
    //   console.log('error on NEP2Login', error)
    //   this.ts.get(this.translationPrefix + 'nep2_passphrase_error').take(1).subscribe(data => {
    //     this.np.emit(data)
    //   })

    //   loading.dismiss().catch(() => { })
    // }

  }
}
