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

	constructor (
		public navCtrl: NavController,
		public navParams: NavParams,
		private np: NotificationProvider,
		private lp: LoadingProvider,
		private ts: TranslateService,
		private loadingCtrl: LoadingController,
		private store: Store<RootState>
	) {}

	ngOnInit () {
		this.store.select(AuthSelectors.getError).subscribe(error => error && this.np.emit({ message: error }))
    this.store.select(AuthSelectors.getLoading).subscribe(bool => bool && this.lp.emit(bool))
	}

	NEP5Login = file => this.store.dispatch(new AuthActions.Login(file))


	wifLogin (keyValue) {
		return keyValue === 'test'
			? this.NEP5Login(nep5Wallet)
			: this.store.dispatch(new AuthActions.LoginWif(keyValue))
	}

	oldWalletLogin = ({ oldWallet, passphrase }) =>
		this.store.dispatch(new AuthActions.LoginOldWallet({ oldWallet, passphrase }))

  NEP2Login ({ encrypted, passphrase }) {
    const loading = this.loadingCtrl.create()
    loading.present()

    decryptAsync(encrypted, passphrase).then(wif => {
      const tempAcct = new wallet.Account(wif)
      const { address } = tempAcct
      const acct = new wallet.Account({
        address,
        label: address,
        key: encrypted,
        isDefault: true
      })
      this.store.dispatch(new WalletActions.AddAccount(acct))
      loading.dismissAll()
      this.navCtrl.setRoot('Tabs')
    }).catch((e) => {
      /* It is usually to get there because the passphrase is wrong */
      console.log('error on NEP2Login', e)
      let msg: string
      this.ts.get(this.translationPrefix + 'nep2_passphrase_error').take(1).subscribe(e => msg = e)
      this.np.emit(msg)
      loading.dismissAll()
    })
    // this.store.dispatch(new AuthActions.LoginNEP2())
  }
}
