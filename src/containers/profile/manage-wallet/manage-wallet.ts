import {
	Component,
	ElementRef,
	ViewChild
} from '@angular/core'
import { Store } from '@ngrx/store'
import {
	AlertController,
	LoadingController,
	Loading,
	IonicPage,
	AlertOptions,
	ModalController
} from 'ionic-angular'
import { Clipboard } from '@ionic-native/clipboard'

import { RootState } from '../../../store/reducers'
import { Account } from '../../../shared/typings'
import { nep5Wallet } from '../../../shared/userWallet'
import {
	SettingsSelectors,
	WalletSelectors
} from '../../../store/selectors'
import {
	AuthActions,
	WalletActions
} from '../../../store/actions'
import { WalletProvider } from '../../../providers/wallet/wallet.provider'
import { ManageWalletCards } from '../../../components/profile/manage-wallet'
import { wallet } from '../../../libs/neon'
import { concat, flip, divide, path, split, compose } from 'ramda'


@IonicPage({
	name: 'ManageWallet',
	segment: 'manage-wallet'
})
@Component({
	selector: 'page-manage-wallet',
	templateUrl: 'manage-wallet.html'
})
export class ManageWalletPage {
	// accounts = this.accountProvider.accounts
	accounts = this.store.select(WalletSelectors.getAccounts)
	currency = this.store.select(SettingsSelectors.getCurrency)
	alertOptions = {
		cssClass: 'mw__exports-actions--box',
		message: '注意，导出 私钥 或 WIF 并使用是一件非常危险的事情，建议使用加密私钥（EncryptedKey）代替',
		inputs: [{ name: 'passphrase', placeholder: '钱包密码', type: 'password' }],
		buttons: [
			{ text: '取消' }
		]
	}

	get marginTop () {
		const splitByDot = split('.')
		type querySelector = (str: string) => NodeList
		const scrollContent = this.elementRef.nativeElement.querySelector('.scroll-content')
		const scrollContentMarginTop = path(splitByDot('style.marginTop'), scrollContent)

		const divideBy = flip(divide)
		const stringAppend = flip(concat)
		const toString = n => n.toString()
		return compose(
			stringAppend('px'),
			toString,
			divideBy(2),
			parseInt,
			path(splitByDot('style.marginTop'))
		)(scrollContentMarginTop)
	}

	@ViewChild('cards') cards: ManageWalletCards

	constructor (
		private alertCtrl: AlertController,
		private walletProvider: WalletProvider,
		private clipBoard: Clipboard,
		private loadingCtrl: LoadingController,
		private modalCtrl: ModalController,
		private elementRef: ElementRef,
		private store: Store<RootState>
	) { }

	ngOnInit () {
		this.store.dispatch(new AuthActions.Login(nep5Wallet))
	}

	handleSetDefaultAccount (account) {
		this.store.dispatch(new WalletActions.SetDefaultAccount(account))
	}

	handleSaveAccount (account: Account) {
		this.store.dispatch(new WalletActions.ChangeAccountLabel(account))
	}

	handleRemoveAccount (account) {
		// this.store.dispatch(new WalletActions.RemoveAccount(account))
		const { offsetHeight, offsetWidth } = this.cards.slides.container.querySelector('.card') as HTMLElement
		console.log('[HandleRemoveAccount]', this.elementRef)

		const data = { account, offsetHeight, offsetWidth,  }
		this.openModal(data)
	}

	openModal (data) {
		const removeModal = this.modalCtrl.create('RemoveAccountModal', data, {
			cssClass: 'sea-card'
		})
		removeModal.present()
	}

	showKey ({ title, message }) {
		const prompt = this.alertCtrl.create(<AlertOptions>{
			title,
			message,
			cssClass: 'mw__exports-actions--key',
			buttons: [
				{ text: '取消' },
				{
					text: '复制',
					handler: () => this.clipBoard.copy(message)
				}
			]
		})
		prompt.present()
	}

	showPrivateKeyBox (account) {
		const commonLoading = this.loadingCtrl.create()
		const alertOptions = Object.assign({}, this.alertOptions, {
			title: '导出私钥',
			buttons: [
				...this.alertOptions.buttons,
				{
					text: '确认',
					handler: ({ passphrase }) => {
						if (!passphrase || passphrase.length <= 4) return false
						this.parsePassphrase(
							account.encrypted, passphrase, commonLoading, 'privateKey')
					}
				}
			]
		})
		const prompt = this.alertCtrl.create(alertOptions)
		prompt.present()
	}

	showWIFKeyBox (account) {
		const commonLoading = this.loadingCtrl.create()
		const alertOptions = Object.assign({}, this.alertOptions, {
			title: '导出WIF',
			buttons: [
				...this.alertOptions.buttons,
				{
					text: '确认',
					handler: ({ passphrase }) => {
						if (!passphrase || passphrase.length <= 4) return false
						this.parsePassphrase(account.encrypted, passphrase, commonLoading, 'wif')
					}
				}
			]
		})
		const prompt = this.alertCtrl.create(alertOptions)
		prompt.present()
	}

	showEncryptedKeyBox (account) {
		this.showKey({ title: 'EncryptedKey', message: account.encrypted })
	}

	async parsePassphrase (encryptedKey, passphrase, commonLoading, type) {
		await commonLoading.present()
		try {
			const wif = wallet.decrypt(encryptedKey, passphrase)
			let account = new wallet.Account(wif)
			await commonLoading.dismiss()
			if (type === 'privateKey')
				return this.showKey({ title: '私钥', message: account[type] })
			return this.showKey({ title: 'WIF', message: account[type] })
		} catch (error) {
			this.handleError(commonLoading)
			await commonLoading.dismiss()
		}
	}

	openWalletLocation () {

	}



	async handleError (commonLoading: Loading) {
		await commonLoading.dismiss()

		const prompt = this.alertCtrl.create({
			title: '提示',
			message: '密码错误',
			buttons: ['OK']
		})

		await prompt.present()
	}

	showDeleteActionBox (toBeDeletedAccount) {
		const alert = this.alertCtrl.create(<AlertOptions>{
			title: '删除钱包',
			message: '请注意！点击确定删除钱包之后，钱包将不可恢复！确定执行删除钱包操作？',
			buttons: [
				{ text: '取消' },
				{
					text: '确定',
					handler: async () => {
						const loading = this.loadingCtrl.create()
						await this.deleteAccount(toBeDeletedAccount)
						await loading.dismiss()
						this.showDeleteSuccess()
						return true
					}
				}
			]
		})

		alert.present()
	}

	deleteAccount (toBeDeletedAccount) {
		/*const wallet = this.walletProvider.wallet
		this.walletProvider.wallet = <any>{
			...wallet,
			accounts: wallet.accounts.filter(account => JSON.stringify(account) !== JSON.stringify(toBeDeletedAccount))
		}*/
		return Promise.resolve()
	}

	setDefaultAccount (toBeSettedAccount) {
		/*const wallet = this.walletProvider.wallet
		this.walletProvider.wallet = <any>{
			...wallet,
			accounts: wallet.accounts.map(account => {
				account.isDefault = JSON.stringify(account) == JSON.stringify(toBeSettedAccount)
				return account
			})
		}*/
	}

	showDeleteSuccess () {
		const alert = this.alertCtrl.create({
			title: '操作完成！',
			message: '钱包已删除。',
			buttons: [
				{ text: 'OK' }
			]
		})
		alert.present()
	}
}
