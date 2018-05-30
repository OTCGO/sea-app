import {
	Component,
	ElementRef,
	EventEmitter,
	Input,
	Output,
} from '@angular/core'
import { Clipboard } from '@ionic-native/clipboard'
import {
	AlertController,
	LoadingController,
	Platform
} from 'ionic-angular'
import { NotificationProvider } from '../../../providers'
import { wallet } from '../../../libs/neon'
import { Account } from '../../../shared/typings'
import * as copy from 'copy-to-clipboard'
import { IfObservable } from 'rxjs/observable/IfObservable'
import { TranslateService } from '@ngx-translate/core'

@Component({
	selector: 'manage-wallet-card',
	templateUrl: 'manage-wallet-card.html'
})
export class ManageWalletCard {
	tempLabel = ''
	baseAlertOptions: any
	translationPrefix = 'PROFILE.MANAGE_WALLET.'

	@Input() account: Account
	@Input() oCurrency: string
	@Input() amount: number
	@Input() gas: number
	@Input() showClose: boolean
	@Output() onSave = new EventEmitter<Account>()
	@Output() onRemove = new EventEmitter<Account>()
	@Output() onSetDefault = new EventEmitter<Account>()

	get label () { return this.account.label }
	get isDefault () { return this.account.isDefault }
	get labelTop () {
		const height = this.el.nativeElement.querySelector('.mw__label').clientHeight
		return `-${height}px`
	}

	constructor (
		private alertCtrl: AlertController,
		private clipBoard: Clipboard,
		private loadingCtrl: LoadingController,
		private np: NotificationProvider,
		private platform: Platform,
		private el: ElementRef,
		private ts: TranslateService,
	) {

		let message

		this.ts.get('PROFILE.MANAGE_WALLET.message').subscribe(data => {
			message = data
		})

		let placeholder

		this.ts.get('PROFILE.MANAGE_WALLET.REMOVE_ACCOUNT.input').subscribe(data => {
			placeholder = data
		})

		let btnCancle

		this.ts.get('PROFILE.CONTACTS.remove_disagree').subscribe(data => {
			btnCancle = data
		})

		this.baseAlertOptions = {
			cssClass: 'mw__exports-actions--box',
			// message: '注意，导出 私钥  并使用是一件非常危险的事情，建议使用加密私钥（EncryptedKey）代替',
			message ,
			inputs: [{ name: 'passphrase', placeholder: placeholder, type: 'password' }],
			buttons: [ { text: btnCancle } ]
		}
	 }

	handleWIFClick (account) { this.showWIFKeyBox(account) }


	handleEncryptedClick (account) {
		try {
			console.log('handleEncryptedClick:account', account)
			// if (!account.encrypted) {
			// 	this.np.emit('请使用WIF私钥创建钱包，再导出NEP2私钥')
			// }
			this.showKeyBox({ title: 'EncryptedKey', message: account.encrypted })
		} catch (e) {
			this.np.emit('请使用WIF私钥创建钱包，再导出NEP2私钥')
		}
	}

	handleSaveClick (account) {
		if (this.tempLabel) {
			const acct = new wallet.Account(account)
			acct.label = this.tempLabel
			this.onSave.emit(acct)
			this.tempLabel = ''
		}
	}

	showWIFKeyBox (account) {
		try {
			// if (account.WIF) return this.showKeyBox({ title: 'WIF', message: account.WIF })

			// let btnCancle
			let btnConfirm



			// this.ts.get('PROFILE.CONTACTS.remove_disagree').subscribe(data => {
			// 	btnCancle = data
			// })
			this.ts.get('PROFILE.CONTACTS.remove_agree').subscribe(data => {
				btnConfirm = data
			})




			const commonLoading = this.loadingCtrl.create()
			const alertOptions = Object.assign({}, this.baseAlertOptions, {
				title: 'wif',
				buttons: [
					...this.baseAlertOptions.buttons, {
						text: btnConfirm,
						handler: ({ passphrase }) =>
							passphrase &&
							passphrase.length >= 4 &&
							this.parsePassphrase(account.encrypted, passphrase, commonLoading, 'wif')
					}
				]
			})
			this.alertCtrl.create(alertOptions).present()
		} catch (e) {

		}
	}

	showKeyBox ({ title, message }) {
		const handler = () => {
			if (this.platform.is('mobileweb') || this.platform.is('core')) {
				// const state = copy(message) ? 'success' : 'fail'
				const el = document.createElement('textarea')
				el.value = message
				document.body.appendChild(el)
				el.select()
				document.execCommand('copy')
				document.body.removeChild(el)

				return this.np.emit(`copy success!`)
			}

			let copyText
			this.ts.get('CW.BACKUP.success').subscribe(data => {
				copyText = data
			})
			this.clipBoard.copy(message).then(() => this.np.emit(copyText))
		}

		let btnCancle
		let btnCopy

		this.ts.get('PROFILE.CONTACTS.remove_disagree').subscribe(data => {
			btnCancle = data
    	})

    	this.ts.get('POSSESSIONS.QR_CODE.copy').subscribe(data => {
			btnCopy = data
		})

		this.alertCtrl.create({
			title, message, cssClass: 'mw__exports-actions--key',
			buttons: [{ text: btnCancle }, { text: btnCopy, handler }]
		}).present()
	}

	async parsePassphrase (encryptedKey, passphrase, commonLoading, type) {
		await commonLoading.present()
		try {




			const wif = wallet.decrypt(encryptedKey, passphrase)
			const account = new wallet.Account(wif)
			await commonLoading.dismiss().catch(() => {})
			if (type === 'privateKey') return this.showKeyBox({ title: wif, message: account['privateKey'] })
			return this.showKeyBox({ title: 'WIF', message: account['WIF'] })
		} catch (error) {
			await this.handleError(commonLoading)
		}
	}



	async handleError (loading) {

		let title
		let message

		this.ts.get('PROFILE.MANAGE_WALLET.prompt').subscribe(data => {
			title = data
		})

		this.ts.get('LOGIN.nep2_passphrase_error').subscribe(data => {
			message = data
		})
		await loading.dismiss().catch(() => {})
		await this.alertCtrl.create({
			title: title,
			message: message,
			buttons: ['OK']
		}).present()
	}

	/* Leave this three for later feature */
	handleOpenLocationClick () {}
	handlePrivateKeyClick (account) {
		this.showPrivateKeyBox(account)
	}
	showPrivateKeyBox (account) {
		const commonLoading = this.loadingCtrl.create()
		const handler = ({ passphrase }) => {
			if (!passphrase || passphrase.length < 4) return false
			this.parsePassphrase(account.encrypted, passphrase, commonLoading, 'privateKey')
		}

		let title
		let btnConfirm

		this.ts.get('PROFILE.MANAGE_WALLET.export_wif').subscribe(data => {
			title = data
			// message = data
			// placeholder = data
		})

		this.ts.get('PROFILE.CONTACTS.remove_agree').subscribe(data => {
			btnConfirm = data
		})


		const alertOptions = Object.assign({}, this.baseAlertOptions, {
			title: title,
			buttons: [...this.baseAlertOptions.buttons, { text: btnConfirm, handler }]
		})
		this.alertCtrl.create(alertOptions).present()
	}
}
