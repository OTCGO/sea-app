import {
	Component,
	EventEmitter,
	Input,
	Output,
} from '@angular/core'
import { Clipboard } from '@ionic-native/clipboard'
import {
	AlertController,
	AlertOptions,
	LoadingController
} from 'ionic-angular'
import { wallet } from '../../../libs/neon'
import { Account } from '../../../shared/typings'


@Component({
	selector: 'manage-wallet-card',
	templateUrl: 'manage-wallet-card.html'
})
export class ManageWalletCard {
	tempLabel = ''
	baseAlertOptions = {
		cssClass: 'mw__exports-actions--box',
		message: '注意，导出 私钥 或 WIF 并使用是一件非常危险的事情，建议使用加密私钥（EncryptedKey）代替',
		inputs: [{ name: 'passphrase', placeholder: '钱包密码', type: 'password' }],
		buttons: [ { text: '取消' } ]
	}
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

	constructor (
		private alertCtrl: AlertController,
		private clipBoard: Clipboard,
		private loadingCtrl: LoadingController
	) { }

	handleWIFClick (account) { this.showWIFKeyBox(account) }
	handleEncryptedClick (account) { this.showKeyBox({ title: 'EncryptedKey', message: account.encrypted }) }

	handleSaveClick (account) {
		if (this.tempLabel) {
			const acct = new wallet.Account(account)
			acct.label = this.tempLabel
			this.onSave.emit(acct)
			this.tempLabel = ''
		}
	}

	showWIFKeyBox (account) {
		const commonLoading = this.loadingCtrl.create()
		const handler = ({ passphrase }) => {
			if (!passphrase || passphrase.length < 4) return false
			this.parsePassphrase(account.encrypted, passphrase, commonLoading, 'wif')
		}
		const alertOptions = Object.assign({}, this.baseAlertOptions, {
			title: '导出WIF',
			buttons: [...this.baseAlertOptions.buttons, { text: '确认', handler }]
		})
		this.alertCtrl.create(alertOptions).present()
	}

	showKeyBox ({ title, message }) {
		const handler = () => this.clipBoard.copy(message)
		this.alertCtrl.create(<AlertOptions>{
			title, message, cssClass: 'mw__exports-actions--key',
			buttons: [{ text: '取消' }, { text: '复制', handler }]
		}).present()
	}

	async parsePassphrase (encryptedKey, passphrase, commonLoading, type) {
		await commonLoading.present()
		try {
			const wif = wallet.decrypt(encryptedKey, passphrase)
			let account = new wallet.Account(wif)
			await commonLoading.dismiss()
			if (type === 'privateKey') return this.showKeyBox({ title: '私钥', message: account['privateKey'] })
			return this.showKeyBox({ title: 'WIF', message: account['WIF'] })
		} catch (error) {
			await this.handleError(commonLoading)
		}
	}

	async handleError (loading) {
		await loading.dismiss()
		await this.alertCtrl.create({
			title: '提示',
			message: '密码错误',
			buttons: ['OK']
		}).present()
	}

	/* Leave this three for later feature */
	handleOpenLocationClick () {}
	handlePrivateKeyClick (account) {}
	showPrivateKeyBox (account) {
		const commonLoading = this.loadingCtrl.create()
		const handler = ({ passphrase }) => {
			if (!passphrase || passphrase.length <= 4) return false
			this.parsePassphrase(account.encrypted, passphrase, commonLoading, 'privateKey')
		}
		const alertOptions = Object.assign({}, this.baseAlertOptions, {
			title: '导出私钥',
			buttons: [...this.baseAlertOptions.buttons, { text: '确认', handler }]
		})
		this.alertCtrl.create(alertOptions).present()
	}
}
