import {
	Component,
	OnDestroy,
	OnInit
} from '@angular/core'
import { Store } from '@ngrx/store'
import {
  IonicPage,
  NavController,
  LoadingController
} from 'ionic-angular'
import { TranslateService } from '@ngx-translate/core'

import { wallet } from '../../libs/neon'
import { NotificationProvider, LoadingProvider } from '../../providers'
import { fromWallet } from '../../store/reducers'
import { AuthActions } from '../../store/actions'
import { AuthSelectors, WalletSelectors } from '../../store/selectors'
import 'rxjs/add/operator/take'
import { concat } from 'rxjs/operators'


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
    private loadingCtrl: LoadingController,
    private ts: TranslateService,
  ) { }

  ngOnInit () {
    this.store.select(AuthSelectors.getLoading).subscribe(bool => this.lp.emit(bool))
		this.store.select(AuthSelectors.getError).subscribe(err => this.np.emit({ message: err }))
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
		const loading = this.loadingCtrl.create()
		loading.present()


		setTimeout(() => {
		    loading.dismiss().catch(() => {})
		}, 1000)

    let pwdtip
    this.ts.get('CW.pwdtip').subscribe(data => {
      pwdtip = data
    })
    if (this.passphrase1 && !this.validatePassphraseStrength(this.passphrase1)) {
      return this.np.emit({ message: pwdtip })
    }


    if (this.passphrase1 !== this.passphrase2) {
      return
    }

    // if (this.wif && !wallet.isWIF(this.wif)) {
    //   this.np.emit({ message: 'WIF format wrong' })
    //   return
    // }

    // const variations: object = {
    //     digits: /\d/.test(this.passphrase1), // 数字
    //     lower: /[a-z]/.test(this.passphrase1), // 小写
    //     upper: /[A-Z]/.test(this.passphrase1), // 大写
    //     length: this.passphrase1.length > 10 // 长度 11位
    // }

    // if (/\d/.test(this.passphrase1) && /[a-z]/.test(this.passphrase1) && /[A-Z]/.test(this.passphrase1) && this.passphrase1.length > 10 ) {

    // }

    const dispatchOption = {
      wif: this.wif,
      label: this.name,
      passphrase: this.passphrase1
    }
    loading.dismiss().catch(() => {}).catch(() => {})
    this.store.dispatch(new AuthActions.CreateWallet(dispatchOption))



  }

  validatePassphraseStrength (passphrase) {
    return  8 <= this.passphrase1.length && this.passphrase1.length <= 16
    // return /\d/.test(this.passphrase1) && /[a-z]/.test(this.passphrase1) && /[A-Z]/.test(this.passphrase1) && this.passphrase1.length > 10
  }
}
