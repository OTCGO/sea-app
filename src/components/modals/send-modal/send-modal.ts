import { Component, Inject } from '@angular/core'
import {
	AlertController,
	IonicPage,
	LoadingController,
	NavParams,
	ViewController
} from 'ionic-angular'
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms'

import { SendModalProvider } from './send-modal.provider'
import { BarcodeScanner, BarcodeScanResult } from '@ionic-native/barcode-scanner'
import { isAddress } from './send-modal.provider'
import { NotificationProvider } from '../../../providers/notification.provider'


@IonicPage({
	name: 'SendModal'
})
@Component({
	selector: 'send-modal',
	templateUrl: 'send-modal.html'
})
export class SendModalComponent {
	sendForm: FormGroup
	possessionData = this.navParams.data

	constructor (
		public viewCtrl: ViewController,
		public navParams: NavParams,
		private barcodeScanner: BarcodeScanner,
		private notificationProvider: NotificationProvider,
		private alertCtrl: AlertController,
		private loadingCtrl: LoadingController,
		private sendModalProvider: SendModalProvider,
		@Inject(FormBuilder) private fb: FormBuilder
	) {
		this.sendForm = this.fb.group({
			address: ['', [Validators.required, addressValidator]],
			passphrase: ['', Validators.required],
			amount: ['', [Validators.required, amountValidator(this.possessionData.amount)]],
			label: [''],
		})
	}

	get toAddress () { return this.sendForm.get('address') }
	get passphrase () { return this.sendForm.get('passphrase') }
	get amount () { return this.sendForm.get('amount') }
	get label () { return this.sendForm.get('label') }

	dismiss () {
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
		    .then(async _=> {
			    const result = await this.sendModalProvider.doSendAsset({
				    dests: this.toAddress.value,
				    amounts: this.amount.value,
				    assetId: this.possessionData.hash
			    })
			    if (result) {
				    await this.dismiss()
				    this.notificationProvider.emit({ message: '转账成功' })
			    }
		    })
		    .catch(err => {
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
		this.barcodeScanner
		    .scan()
		    .then((data: BarcodeScanResult) => {
			    this.toAddress.setValue(data.text)
		    })
		    .catch(err => {
			    this.notificationProvider.emit({ message: err })
		    })
	}
}

function addressValidator (addressCtrl: FormControl): ValidationErrors {
	const { value } = addressCtrl
	return (!value || !isAddress(value))
		? { invalidAddress: true }
		: null
}

function amountValidator (maxValue) {
	return (amountCtrl: FormControl): ValidationErrors | null => {
		const value = amountCtrl.value
		if (!value || value <= 0 || value > maxValue) return { invalidAmount: true }
		return null
	}
}