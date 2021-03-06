import {
	Component,
	OnInit,
	ViewChild
} from '@angular/core'
import {
	AlertController,
	IonicPage,
	LoadingController,
	NavController,
	ViewController,
	Navbar
} from 'ionic-angular'
import { ONT_HASH, ONG_HASH } from '../../../shared/constants'
import { BarcodeScanner, BarcodeScanResult } from '@ionic-native/barcode-scanner'
import { Store } from '@ngrx/store'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import {
	addressValidator,
	amountValidator,
	amountInt
} from './send-modal.validators'
import { TranslateService } from '@ngx-translate/core'
import { RootState } from '../../../store/reducers'
import { IBalance } from '../../../shared/models'
import { isAddress } from '../../../shared/utils'
import { SendModalProvider } from './send-modal.provider'
import { NotificationProvider } from '../../../providers'
import { TransactionsActions, BalancesActions } from '../../../store/actions'
import { TransactionsSelectors, BalancesSelectors } from '../../../store/selectors'

@IonicPage({
	name: 'SendModal'
})
@Component({
	selector: 'send-modal',
	templateUrl: 'send-modal.html'
})
export class SendModalComponent implements OnInit {
	// @ViewChild(Navbar) navBar: Navbar

	formGroup: FormGroup
	selectedBalance: IBalance
	translationPrefix = 'POSSESSIONS.SEND_MODAL.'

	get toAddress() { return this.formGroup.get('address') }
	get passphrase() { return this.formGroup.get('passphrase') }
	get amount() { return this.formGroup.get('amount') }
	get label() { return this.formGroup.get('label') }
	get fee() { return this.formGroup.get('fee') }
	get w() {
		try {
			return this.sendModalProvider.account && this.sendModalProvider.account.WIF
		} catch (e) {
			return ''
		}
	}


	private ongBalance
	// private symbol = 'ontology-ONG'
	private feeTitle = 'gas'
	private inputType = true
	private feeDisabled = false
	private maxFee = 0

	constructor(
		public viewCtrl: ViewController,
		private navCtrl: NavController,
		private barcodeScanner: BarcodeScanner,
		private notificationProvider: NotificationProvider,
		private alertCtrl: AlertController,
		private loadingCtrl: LoadingController,
		public sendModalProvider: SendModalProvider,
		private store: Store<RootState>,
		private ts: TranslateService,
		private fb: FormBuilder
	) {
		try {


			this.store.select(BalancesSelectors.getSelectedBalance).subscribe(selectedBalance => this.selectedBalance = selectedBalance)
			this.formGroup = this.fb.group({
				address: ['', [Validators.required, addressValidator], [this.nncValidator.bind(this)]],
				passphrase: ['', this.w ? [] : Validators.required],
				amount: ['', [Validators.required, amountValidator(this.selectedBalance.amount), amountInt(this.selectedBalance.hash)]],
				label: [''],
				nncAddress: [''],
				fee:[0]
			})

		} catch (error) {

		}
	}

	ngOnInit(): void {

		// ont ong 默认手续费
		if (this.selectedBalance.type === 'ONTOLOGY') {

			this.store.select(BalancesSelectors.getOngBalance).subscribe(balance => {
				console.log('ont:ngOnInit', balance)
				const result = parseFloat(balance.amount)

				this.ongBalance = result

			})

			this.formGroup.get('fee').setValue(0.01)
			this.maxFee = 1
			this.feeDisabled = true

			this.feeTitle = 'ong'
			return
		}
		
		else {
			this.getMaxFee()
		}

	}

	ionViewDidLoad() {
		// this.navBar.backButtonClick = (e: UIEvent) => {
		// 	// todo something
		// 	// this.navCtrl.pop()
		// 	console.log('backButtonClick')
		// 	// this.navCtrl.push('Tabs')
		// 	// this.navCtrl.push('PossessionDetail')
		// 	// this.viewCtrl.dismiss()
		// 	this.navCtrl.push('Tabs')
		// 	// this.navCtrl.setRoot('Tabs')
		// }
	}

	ionViewWillEnter() {
		// this.store.select(TransactionsSelectors.getSelectedAddress).take(1).subscribe(address => this.toAddress.setValue(address))
	}

	ionViewDidLeave() {
		// this.store.dispatch(new TransactionsActions.CleanSelectedContact())
	}

	handleClose() {
		this.viewCtrl.dismiss().catch(() => { })
		this.formGroup.reset()
	}

	feeChange(event){
		console.log('feeChange',event.value)
		this.formGroup.get('fee').setValue(event.value / 1000)
	}

	getMaxFee(){
		this.store.select(BalancesSelectors.getGasBalance).subscribe(balance => {
			console.log('getGasBalance', balance)

			this.maxFee = Number(balance.amount)> 1 ? 1 :Math.floor(Number(balance.amount) * 1000) / 1000    
		
			if(Number(this.maxFee) > 0.001){
				this.formGroup.get('fee').setValue(0.001)
			}

			return
			
		})



		// this.formGroup.get('fee').setValue(0.01)
		// this.feeDisabled = true

		return
	}

	async nncValidator() {

		try {


			// console.log('nncValidator', this.toAddress.value)
			if (this.toAddress.value) {

				if (/\.neo$/.test(this.toAddress.value)) {
					const result = await this.sendModalProvider.getNncAddress(this.toAddress.value)
					console.log('result', result)
					if (result['error']) {

						this.ts.get('POSSESSIONS.SEND_MODAL.nncError').subscribe(data => {
							this.formGroup.get('nncAddress').setValue(data)
							return this.notificationProvider.emit({ message: data })
						})
					}

					return this.formGroup.get('nncAddress').setValue(result['address'])
				}
				return this.formGroup.get('nncAddress').setValue(this.toAddress.value)
			}

		} catch (error) {
			console.error('nncValidator', error)
		}

	}

	/**
	 * Address must be check validity and required
	 * @if address && isAddress(address)
	 * @then passphrase been use for signature the wallet file is require
	 * @then amount is required and translate to big num
	 * @optional Label
	 **/
	async transfer() {
		this.toAddress.markAsTouched()
		this.passphrase.markAsTouched()
		this.amount.markAsTouched()

		if (!this.formGroup.valid ||
			!this.toAddress.valid ||
			!this.amount.valid ||
			!this.passphrase.valid) {
			return
		}

		console.log('this.ongBalance', this.ongBalance)
		if (this.selectedBalance.type === 'ONTOLOGY') {
			// this.ongBalance < 0.01

			if (this.ongBalance < 0.01) {
				let ongBalanceError
				this.ts.get('PROFILE.CLAIMS.ong_balance_error').subscribe(data => {
					ongBalanceError = data
				})
				this.notificationProvider.emit({ message: ongBalanceError })
				return false
			}
		}

		let executing
		this.ts.get('OPERATOR.executing').subscribe(data => {
			executing = data
		})
		const loading = this.loadingCtrl.create({
			content: executing
		})
		await loading.present()


		try {
			let pr
			try {
				pr = await this.sendModalProvider.decrypt(this.passphrase.value)
			} catch (error) {
				this.ts.get('POSSESSIONS.SEND_MODAL.fails').subscribe(data => {
					this.notificationProvider.emit({ message: data })
				})
				loading.dismiss().catch(() => { }).catch(() => { })
				return
			}


			let result: any

			// console.log('this.selectedBalance.hash', this.selectedBalance.hash)
			// console.log('this.selectedBalance.hash', this.selectedBalance.hash === ONG_HASH || this.selectedBalance.hash === ONT_HASH)
			if (this.selectedBalance.type === 'ONTOLOGY') {
				// this.ongBalance < 0.01
				if (this.ongBalance < 0.01) {
					return false
				}

				result = await this.sendModalProvider.doSendAssetOnt({
					// dests: this.toAddress.value.replace(/^\s+|\s+$/g, ''),
					dests: this.formGroup.get('nncAddress').value.replace(/^\s+|\s+$/g, ''),
					amounts: this.amount.value,
					assetId: this.selectedBalance.hash,
					fee: '0.01'
				}, pr)

			} else {
				result = await this.sendModalProvider.doSendAsset({
					dests: this.formGroup.get('nncAddress').value.replace(/^\s+|\s+$/g, ''),
					amounts: this.amount.value,
					assetId: this.selectedBalance.hash,
					fee: `${this.formGroup.get('fee').value}`
				}, pr)
			}

			await this.handleClose()
			loading.dismiss().catch(() => { }).catch(() => { })


			console.log('result', result)
			// 成功
			if (result.result) {

				this.ts.get('POSSESSIONS.SEND_MODAL.success').subscribe(data => {
					this.notificationProvider.emit({ message: data })
				})

				// this.getMaxFee()

				return
			}


			// this.notificationProvider.emit({ message: '广播交易失败' })


			this.ts.get('ERROR.broadcast_err').subscribe(data => {
				this.notificationProvider.emit({ message: data })
			})



			return

		} catch (error) {
			console.log('error', error)
			loading.dismiss().catch(() => { }).catch(() => { })

			// this.notificationProvider.emit({ message: error })

			this.ts.get('ERROR.build_err').subscribe(data => {
				this.notificationProvider.emit({ message: data })
			})

			// this.notificationProvider.emit({ message: error })

			// this.ts.get('POSSESSIONS.SEND_MODAL.fails').subscribe(data => {

			// })
			// this.ts.get('POSSESSIONS.SEND_MODAL.fails').subscribe(data => {
			// 	this.notificationProvider.emit({ message: data })
			// })
		}



		/*
		this.sendModalProvider
			.decrypt(this.passphrase.value)
			.then(async pr => {

				try {


					let result: any

					console.log('this.selectedBalance.hash', this.selectedBalance.hash)
					console.log('this.selectedBalance.hash', this.selectedBalance.hash === ONG_HASH || this.selectedBalance.hash === ONT_HASH)
					if (this.selectedBalance.hash === ONG_HASH || this.selectedBalance.hash === ONT_HASH) {
						// this.ongBalance < 0.01
						if (this.ongBalance < 0.01) {
							return false
						}

						result = await this.sendModalProvider.doSendAssetOnt({
							// dests: this.toAddress.value.replace(/^\s+|\s+$/g, ''),
							dests: this.formGroup.get('nncAddress').value.replace(/^\s+|\s+$/g, ''),
							amounts: this.amount.value,
							assetId: this.selectedBalance.hash
						}, pr)

					} else {
						result = await this.sendModalProvider.doSendAsset({
							dests: this.formGroup.get('nncAddress').value.replace(/^\s+|\s+$/g, ''),
							amounts: this.amount.value,
							assetId: this.selectedBalance.hash
						}, pr)
					}





					await this.handleClose()
					if (result.result) {

						this.ts.get('POSSESSIONS.SEND_MODAL.success').subscribe(data => {
							this.notificationProvider.emit({ message: data })
						})

						return
					}

					// network error
					this.ts.get('ERROR.network_err').subscribe(data => {
						this.notificationProvider.emit({ message: data })
					})

					return
				} catch (error) {

					this.ts.get('ERROR.network_err').subscribe(data => {
						this.notificationProvider.emit({ message: data })
					})
				}

			})
			.catch(err => {

				this.ts.get('POSSESSIONS.SEND_MODAL.fails').subscribe(data => {
					this.notificationProvider.emit({ message: data })
				})

				// this.ts.get('POSSESSIONS.SEND_MODAL.fails').subscribe(data => {
				// 	this.showPrompt({ message: data })
				// })
				// 	if (err.message)
				// return this.showPrompt({ message: err.message, title: '错误' })

			})
			.then(_ => {
				this.store.dispatch(new BalancesActions.Load())
				this.store.dispatch(new TransactionsActions.CleanSelectedContact())
				loading.dismiss().catch(() => { }).catch(() => { })
			})
			*/
	}

	showPrompt(config) {
		const prompt = this.alertCtrl.create(config)
		prompt.present()
	}

	handleScanClick() {
		this.barcodeScanner.scan()
			.then((data: BarcodeScanResult) => isAddress(data.text) && this.toAddress.setValue(data.text))
			.catch(err => this.notificationProvider.emit({ message: err }))
	}

	handleContactClick() {
		this.navCtrl.push('Contacts', { fromProfile: false })
	}

	displayPwd() {
		console.log('displayPwd')
		this.inputType = !this.inputType
	}
}
