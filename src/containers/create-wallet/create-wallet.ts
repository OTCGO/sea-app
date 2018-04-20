import {
	Component,
	OnDestroy,
	OnInit
} from '@angular/core'
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
export class CreateWalletPage implements OnInit, OnDestroy {
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
    this.store.select(AuthSelectors.getLoading).subscribe(bool => {
      console.log('Auth loading state:', bool)
      this.lp.emit(bool)
		})
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

  createWallet () {
    if (this.passphrase1 && !this.validatePassphraseStrength(this.passphrase1))
      return this.np.emit({ message: 'Password too short' })

    if (this.passphrase1 !== this.passphrase2) return

    if (this.wif && !wallet.isWIF(this.wif))
			return this.np.emit({ message: 'WIF format wrong' })

		const dispatchOption = {
			wif: this.wif,
			label: this.name,
			passphrase: this.passphrase1
		}
		this.store.dispatch(new AuthActions.CreateWallet(dispatchOption))
  }

  validatePassphraseStrength (passphrase) {
    return passphrase.length >= 4
  }
}
