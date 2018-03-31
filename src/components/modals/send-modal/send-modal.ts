import {
	Component,
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

import { BalancesActions } from '../../../store/actions'
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
	formGroup: FormGroup
	selectedBalance: IBalance

	get toAddress () { return this.formGroup.get('address') }
	get passphrase () { return this.formGroup.get('passphrase') }
	get amount () { return this.formGroup.get('amount') }
	get label () { return this.formGroup.get('label') }

	constructor (
		public viewCtrl: ViewController,
		private barcodeScanner: BarcodeScanner,
		private notificationProvider: NotificationProvider,
		private alertCtrl: AlertController,
		private loadingCtrl: LoadingController,
		private sendModalProvider: SendModalProvider,
		private store: Store<RootState>,
		private fb: FormBuilder
	) {
		this.store.select(BalancesSelectors.getSelectedBalance).subscribe(selectedBalance => this.selectedBalance = selectedBalance)

		this.formGroup = this.fb.group({
			address: ['', [Validators.required, addressValidator.bind(this)]],
			passphrase: ['', Validators.required],
			amount: ['', [Validators.required, amountValidator(1231).bind(this)]],
			label: [''],
		})
	}

	ngOnInit (): void {
	}

	handleClose () {
		this.viewCtrl.dismiss()
		this.formGroup.reset()
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

		if (!this.formGroup.valid || !this.toAddress.valid
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
		    	this.store.dispatch(new BalancesActions.Load())
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
