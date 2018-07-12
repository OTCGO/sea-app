import {
	Component,
	ElementRef,
	EventEmitter,
	Input,
	Output,
	OnDestroy
} from '@angular/core'
import { Clipboard } from '@ionic-native/clipboard'
import {
	AlertController,
	LoadingController,
	Platform,
	ViewController
} from 'ionic-angular'
import { NotificationProvider } from '../../../providers'
import { wallet } from '../../../libs/neon'
import { Account } from '../../../shared/typings'
import * as copy from 'copy-to-clipboard'
import { IfObservable } from 'rxjs/observable/IfObservable'
import { TranslateService } from '@ngx-translate/core'
import { getWif } from '../../../shared/utils'
import { MessageService } from '../../../shared/services'
import { Subscription } from 'rxjs/Subscription'

@Component({
	selector: 'manage-wallet-card',
	templateUrl: 'manage-wallet-card.html'
})
export class ManageWalletCard  implements OnDestroy {
	tempLabel = ''
	baseAlertOptions: any
	translationPrefix = 'PROFILE.MANAGE_WALLET.'
	subscription: Subscription
	private alert
	private commonLoading

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
		private msgService: MessageService,
		private viewCtrl: ViewController,
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
			inputs: [{ name: 'passphrase', placeholder: placeholder, type: 'password'}],
			buttons: [ { text: btnCancle } ]
		}

		this.subscription = this.msgService.getMessage().subscribe(data => {
			// console.log('')
			console.log('this.subscription', data)
			if (data.text === 'manage-wallet') {
				console.log('this.subscription.text', data.text)
				if (this.alert) {
					this.alert.dismiss().catch()
				}

				if (this.commonLoading) {
					this.commonLoading.dismiss().catch()
				}


				this.msgService.msg = undefined
				// this.viewCtrl.dismiss()
			}
		 })


	 }

	handleWIFClick (account) {
		this.msgService.msg = 'manage-wallet'
		this.showWIFKeyBox(account)
	}


	handleEncryptedClick (account) {
		this.msgService.msg = 'manage-wallet'

		try {
			console.log('handleEncryptedClick:account', account)
			// if (!account.encrypted) {
			// 	this.np.emit('请使用WIF私钥创建钱包，再导出NEP2私钥')
			// }

			let neptext

			this.ts.get('PROFILE.MANAGE_WALLET.nep2').subscribe(data => {
				neptext = data
			})

			this.showKeyBox({ title: neptext, message: account.encrypted })
		} catch (e) {
			// this.np.emit('请使用WIF私钥创建钱包，再导出NEP2私钥')
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


			let wiftext

			this.ts.get('PROFILE.MANAGE_WALLET.wif').subscribe(data => {
				wiftext = data
			})

			this.commonLoading = this.loadingCtrl.create()
			const alertOptions = Object.assign({}, this.baseAlertOptions, {
				title: wiftext,
				buttons: [
					...this.baseAlertOptions.buttons, {
						text: btnConfirm,
						handler: ({ passphrase }) =>
							passphrase &&
							passphrase.length >= 4 && passphrase.length <= 20 &&
							this.parsePassphrase(account.encrypted, passphrase, this.commonLoading, 'wif')
					}
				]
			})
			this.alert = this.alertCtrl.create(alertOptions)

			// this.alertCtrl.create(alertOptions).present()

			this.alert.present()

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

		this.alert = this.alertCtrl.create({
			title, message, cssClass: 'mw__exports-actions--key',
			buttons: [{ text: btnCancle }, { text: btnCopy, handler }]
		})

		this.alert.present()

	}

	async parsePassphrase (encryptedKey, passphrase, commonLoading, type) {
		await commonLoading.present()
		try {

			// const wif = wallet.decrypt(encryptedKey, passphrase)
			const wif: any  = await getWif(encryptedKey, passphrase)
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
			if (!passphrase || passphrase.length < 8 ||  passphrase.length > 20) return false
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

	ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.subscription.unsubscribe()
    }
}
