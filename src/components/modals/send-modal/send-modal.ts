import {
	Component,
	Inject,
	OnInit
} from '@angular/core'
import {
	AlertController,
	IonicPage,
	LoadingController,
	ViewController
} from 'ionic-angular'
import { BarcodeScanner, BarcodeScanResult } from '@ionic-native/barcode-scanner'
import { Store } from '@ngrx/store'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import {
	addressValidator,
	amountValidator
} from './send-modal.validators'

import { RootState } from '../../../store/reducers'
import { IBalance } from '../../../shared/models'
import { SendModalProvider } from './send-modal.provider'
import { NotificationProvider } from '../../../providers'
import { BalancesSelectors } from '../../../store/selectors'


@IonicPage({
	name: 'SendModal'
})
@Component({
	selector: 'send-modal',
	templateUrl: 'send-modal.html'
})
export class SendModalComponent implements OnInit {
	sendForm: FormGroup
	selectedBalance: IBalance

	get toAddress () { return this.sendForm.get('address') }
	get passphrase () { return this.sendForm.get('passphrase') }
	get amount () { return this.sendForm.get('amount') }
	get label () { return this.sendForm.get('label') }

	constructor (
		public viewCtrl: ViewController,
		private barcodeScanner: BarcodeScanner,
		private notificationProvider: NotificationProvider,
		private alertCtrl: AlertController,
		private loadingCtrl: LoadingController,
		private sendModalProvider: SendModalProvider,
		private store: Store<RootState>,
		@Inject(FormBuilder) private fb: FormBuilder
	) {}

	ngOnInit (): void {
		this.buildForm()
		this.loadBalance()
	}

	loadBalance() {
		this.store
				.select(BalancesSelectors.getSelectedBalance)
				.subscribe(selectedBalance => this.selectedBalance = selectedBalance)
	}

	buildForm () {
		this.sendForm = this.fb.group({
			address: ['', [Validators.required, addressValidator]],
			passphrase: ['', Validators.required],
			amount: ['', [Validators.required, amountValidator(this.selectedBalance.amount.toNumber())]],
			label: [''],
		})
	}

	handleClose () {
		this.viewCtrl.dismiss()
		this.sendForm.reset()
	}

	/**
	 * Address must be check validity and required
	 * @if address && isAddress(address)
	 * @then passphrase been use for signature the wallet file is require
	 * @then amount is required and translate to big num
	 * @optional Label
	 **/
	async transfer () {
		this.toAddress.markAsTouched()
		this.passphrase.markAsTouched()
		this.amount.markAsTouched()

		if (!this.sendForm.valid || !this.toAddress.valid
			|| !this.amount.valid || !this.passphrase.valid) {
			return
		}
		const loading = this.loadingCtrl.create()
		await loading.present()

		this.sendModalProvider
		    .decrypt(this.passphrase.value)
		    .then(async pr => {
			    const result = await this.sendModalProvider.doSendAsset({
				    dests: this.toAddress.value,
				    amounts: this.amount.value,
				    assetId: this.selectedBalance.hash
			    }, pr)
			    if (result) {
				    await this.handleClose()
				    this.notificationProvider.emit({ message: '转账成功' })
			    }
		    })
		    .catch(err => {
		    	if (err.message)
						return this.showPrompt({ message: err.message, title: '错误' })
					this.showPrompt({ message: err, title: '错误' })
				})
		    .then(_=> {
		    	loading.dismissAll()
		    })
	}

	showPrompt (config) {
		const prompt = this.alertCtrl.create(config)
		prompt.present()
	}

	scan () {
		this.barcodeScanner.scan()
				.then((data: BarcodeScanResult) => {
			    this.toAddress.setValue(data.text)
		    })
		    .catch(err => {
			    this.notificationProvider.emit({ message: err })
		    })
	}
}
