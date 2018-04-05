import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import {
  IonicPage,
	NavController,
} from 'ionic-angular'
import { TranslateService } from '@ngx-translate/core'

import { wallet } from '../../libs/neon'
import { NotificationProvider, LoadingProvider } from '../../providers'
import { fromWallet } from '../../store/reducers'
import { AuthActions } from '../../store/actions'
import { AuthSelectors, WalletSelectors } from '../../store/selectors'
import 'rxjs/add/operator/take'


@IonicPage({
  name: 'CreateWallet',
  segment: 'create-wallet'
})
@Component({
  selector: 'page-create-wallet',
  templateUrl: 'create-wallet.html',
})
export class CreateWalletPage implements OnInit {
  private protocolAgreement = false
  private wif: string
  private name: string
  private passphrase1: string
  private passphrase2: string

  private passphraseLengthError: string
  private wifError: string

  constructor (
    private navCtrl: NavController,
    private store: Store<fromWallet.State>,
    private np: NotificationProvider,
    private lp: LoadingProvider,
    private translateService: TranslateService
  ) { }

  ngOnInit () {
    this.store.select(AuthSelectors.getLoading).subscribe(bool => this.lp.emit(bool))
		this.store.select(AuthSelectors.getError).subscribe(err => this.np.emit({ message: err }))
  }

  ngOnDestroy () {
    console.log('destroy call')
  }

  get disabledButton () {
    if (this.wif)
      return !this.passphrase1 || !this.passphrase2 ||
        (this.passphrase1 !== this.passphrase2) ||
        !this.name ||
        !this.protocolAgreement || !this.wif
    return !this.passphrase1 || !this.passphrase2 ||
      (this.passphrase1 !== this.passphrase2) ||
      !this.name ||
      !this.protocolAgreement
  }

  async createWallet () {
    if (this.passphrase1 &&
       !this.validatePassphraseStrength(this.passphrase1)) {
      return this.np.emit({ message: 'Password too short' })
		}

    if (this.passphrase1 !== this.passphrase2) {
      return
		}

    if (this.wif && !wallet.isWIF(this.wif)) {
			return this.np.emit({ message: 'WIF format wrong' })
    }


    try {
      const accountTemp = new wallet.Account(this.wif || wallet.generatePrivateKey())
      const { WIF, address } = accountTemp
      const encryptedWIF = wallet.encrypt(WIF, this.passphrase1)

      const account = new wallet.Account({
        address,
        label: this.name,
        isDefault: true,
        lock: false,
        key: encryptedWIF,
        contract: null,
        extra: null
      } as any)

      this.store.dispatch(new AuthActions.CreateWallet(account))
			this.store.select(WalletSelectors.getExits).subscribe(exits => exits && this.navCtrl.push('BackupWallet'))
    } catch (e) {
      console.log(e)
      this.np.emit({ message: e })
    }
  }

  validatePassphraseStrength (passphrase) {
    return passphrase.length >= 4
  }
}
