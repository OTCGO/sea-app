import { Component, Inject } from '@angular/core'
import {
	AlertController,
	IonicPage, LoadingController, NavParams, ToastController,
	ViewController
} from 'ionic-angular'
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms'

import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner'
import { SendModalProvider } from './send-modal.provider'
import { isAddress } from './send-modal.provider'

@IonicPage()
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
		private qrScanner: QRScanner,
		private toastCtrl: ToastController,
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
	 * passphrase been use for signature the walelt file is require
	 * amount is required and translate to big num
	 * optional Label
	 **/
	async transfer () {
		this.toAddress.markAsTouched()
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
				    await this.toastCtrl.create({ message: '转账成功', duration: 3000 }).present()
				    this.dismiss()
			    }
		    })
		    .catch(err => {
		    	console.log(err)
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

	qrScan () {
		this.qrScanner
		    .prepare()
		    .then((status: QRScannerStatus) => {
			    if (status.authorized) {
			    	let scanSub = this.qrScanner.scan().subscribe(text => {
					    console.log('Scanned something', text)
					    let toast = this.toastCtrl.create({
						    message: text,
						    duration: 5000
					    })
					    toast.present()

					    this.qrScanner.hide()
					    scanSub.unsubscribe()
				    })

				    this.qrScanner.show()

			    } else if (status.denied) {
				    // camera permission was permanently denied
				    // you must use QRScanner.openSettings() method to guide the user to the settings page
				    // then they can grant the permission from there
			    } else {
				    // permission was denied, but not permanently. You can ask for permission again at a later time.

			    }
		    })
			.catch(err => console.log(err))
	}
}

function addressValidator (addressCtrl: FormControl): ValidationErrors {
	const value = addressCtrl.value
	return (!value || !isAddress(value))
		? { invalidAddress: true }
		: null
}

function amountValidator (maxValue) {
	return (amountCtrl: FormControl): ValidationErrors | null => {
		const value = amountCtrl.value
		const numberifyMaxValue = Number(maxValue)
		if (!value || value <= 0 || value > numberifyMaxValue) return { invalidAmount: true }
		return null
	}
}