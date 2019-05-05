
import { Store } from '@ngrx/store'
import { IonicPage, NavController, App, ViewController } from 'ionic-angular'
import { TranslateService } from '@ngx-translate/core'
import { InAppBrowser } from '@ionic-native/in-app-browser'
import {
	Component,
	OnInit,
	ViewChild
} from '@angular/core'
import {
	AlertController,
	LoadingController,
	Navbar
} from 'ionic-angular'
import { ONT_HASH, ONG_HASH } from '../../../shared/constants'
import { BarcodeScanner, BarcodeScanResult } from '@ionic-native/barcode-scanner'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { RootState } from '../../../store/reducers'
import { IBalance } from '../../../shared/models'
import { isAddress } from '../../../shared/utils'
import { NotificationProvider } from '../../../providers'
import { TransactionsActions, BalancesActions } from '../../../store/actions'
import { TransactionsSelectors, BalancesSelectors } from '../../../store/selectors'
import { ClaimsActions } from '../../../store/actions'
import { ClaimsSelectors } from '../../../store/selectors'
import {
	amountValidator,
} from '../../../components/modals/send-modal/send-modal.validators'
import { SendModalProvider } from '../../../components/modals/send-modal/send-modal.provider'
import { AccountProvider } from '../../../providers'

@IonicPage({ name: 'Recharge' })
@Component({
	selector: 'page-recharge',
	templateUrl: 'recharge.html'
})
export class RechargePage implements OnInit {
	formGroup: FormGroup
	selectedBalance: IBalance
	translationPrefix = 'POSSESSIONS.SEND_MODAL.'

	translationPrefixr = 'PROFILE.RECHARGE.'
	get passphrase() { return this.formGroup.get('passphrase') }
	get amount() { return this.formGroup.get('amount') }
	get label() { return this.formGroup.get('label') }



	private ongBalance
	private claims
	private symbol = 'ontology-ONG'
	private btnDisable
	account = this.accountProvider.defaultAccount

	private inputType = true

	get toAddress() { return this.formGroup.get('address') }

	constructor(
		public viewCtrl: ViewController,
		private navCtrl: NavController,
		private barcodeScanner: BarcodeScanner,
		private notificationProvider: NotificationProvider,
		private alertCtrl: AlertController,
		private loadingCtrl: LoadingController,
		private store: Store<RootState>,
		private ts: TranslateService,
		private fb: FormBuilder,
		private accountProvider: AccountProvider,
		public sendModalProvider: SendModalProvider,
		private iab: InAppBrowser
	) {
		try {

			// this.store.select(BalancesSelectors.getSelectedBalance).subscribe(selectedBalance => this.selectedBalance = selectedBalance)

			this.formGroup = this.fb.group({
				address: [''],
				passphrase: [''],
				amount: ['', [Validators.required], [this.checkLength.bind(this)]]
			})



		} catch (error) {

		}
	}

	async checkLength() {
		try {
			console.log('checkLength', this.amount.value.toString().split('.')[1].length > 8)
			if (this.amount.value.toString().split('.')[1].length > 8 ) {
				return { invalidAmount: true }
			}
		} catch (error) {

		}

	}

	ngOnInit(): void {



		this.store.dispatch(new ClaimsActions.LoadONG())
		this.claims = this.store.select(ClaimsSelectors.getEntities)


		this.store.dispatch(new BalancesActions.Load())

		this.store.dispatch(new BalancesActions.Select(this.symbol))
		this.store.select(BalancesSelectors.getSelectedBalance).subscribe(balance => {
			console.log('ont:ngOnInit', balance)
			this.selectedBalance = balance


			const result = parseFloat(balance.amount)


			this.ongBalance = result


			if (result < 0.01 ) {
				this.btnDisable = true
			}



			console.log('ont:ngOnInit', this.btnDisable)
		})



	}


	ionViewWillEnter() {
		 this.store.select(TransactionsSelectors.getSelectedAddress).take(1).subscribe(address => this.toAddress.setValue(address))
	}

	ionViewDidLeave() {
		// this.store.dispatch(new TransactionsActions.CleanSelectedContact())
	}


	/**
	 * Address must be check validity and required
	 * @if address && isAddress(address)
	 * @then passphrase been use for signature the wallet file is require
	 * @then amount is required and translate to big num
	 * @optional Label
	 **/
	async Deposit() {
		try {
			console.log('Deposit,passphrase', this.passphrase.value)
			console.log('Deposit,amount', this.amount.value)

			if (!this.passphrase.value || !this.amount.value) {
				return
			}

			this.btnDisable = true


			console.log('Deposit,ongBalance', this.ongBalance)
			if (parseFloat(this.ongBalance)   < parseFloat(this.amount.value) + 0.01) {

				this.ts.get('PROFILE.CLAIMS.ong_balance_error').subscribe(data => {
					this.notificationProvider.emit({ message: data })
				})

				this.btnDisable = false

				return
			}


			let pr
			try {
				pr = await this.sendModalProvider.decrypt(this.passphrase.value)
			} catch (error) {

				this.btnDisable = false
				console.log('Deposit', error)
				this.ts.get('LOGIN.nep2_passphrase_error').subscribe(data => {
					this.notificationProvider.emit({ message: data })
				})

				return
			}



			console.log('this.selectedBalance.hash', this.selectedBalance.hash)
			console.log('this.selectedBalance.hash', this.selectedBalance.hash === ONG_HASH || this.selectedBalance.hash === ONT_HASH)


			const result: any = await this.sendModalProvider.doSendAssetOnt({
					// dests: this.toAddress.value.replace(/^\s+|\s+$/g, ''),
					dests: 'APV9wADVtSvQQmfuw7gvzsfo3eDrkhpHiK',
					amounts: this.amount.value,
					assetId: this.selectedBalance.hash
				}, pr)


			// 成功


			if (result.result) {
				this.formGroup.reset()

				this.btnDisable = false
				this.ts.get('PROFILE.RECHARGE.success').subscribe(data => {
					this.notificationProvider.emit({ message: data })
				})

				return
			}

			this.btnDisable = false


			this.ts.get('ERROR.network_err').subscribe(data => {
				this.notificationProvider.emit({ message: data })
			})



			return

		} catch (error) {

			this.btnDisable = false
			this.ts.get('ERROR.network_err').subscribe(data => {
				this.notificationProvider.emit({ message: data })
			})


		}
	}


	displayPwd() {
		this.inputType = !this.inputType
	}

	handleNavClick() {
		this.iab.create(`https://explorer.ont.io/address/${this.account.address}/20/1`, '_system')
		return
	}
}
