import { Component } from '@angular/core'
import {
	AlertController, IonicPage,
	NavController,
	NavParams
} from 'ionic-angular'
import { CreateWalletPage } from '../create-wallet/create-wallet'

import { wallet } from '../../libs/neon'
import { WalletProvider } from '../../providers/wallet/wallet.provider'
import { TabsPage } from '../tabs/tabs'
import TEST_WALLET from '../../shared/userWallet'


@IonicPage({
	name: 'Login',
	segment: 'login'
})
@Component({
	selector: 'page-login',
	templateUrl: 'login.html',
})
export class LoginPage {
	private _file: File
	createWalletPage = CreateWalletPage
	importText: string = '导入'
	isWIFKey: boolean = true
	WIFKey: string
	passphrase: string
	isOldWallet: boolean = false

	constructor (
		public navCtrl: NavController,
		public navParams: NavParams,
		private walletProvider: WalletProvider,
		public alertCtrl: AlertController,
	) { }

	ionViewDidLoad () {
		this.walletProvider.initWallet()
	}

	get disabledBtn () {
		if (!this.isOldWallet && this._file) return false
		if (this.isOldWallet && this._file && this.passphrase) return false
		if (this.isWIFKey && this.WIFKey && this.passphrase) return false
	}

	openImportBox (fileInput: HTMLInputElement) {
		this.isWIFKey = false
		this.importText = '导入钱包文件'

		if (window.navigator && !this.WIFKey) fileInput.click()
	}

	openWIFKeyBox () {
		this.isWIFKey = true
		this.importText = '导入'
	}

	fileChange (file) {
		if (file) {
			this.importText = file.name.slice()
			const reader = new FileReader()
			const ng = this

			reader.onload = function () {
				try {
					const JSONFile = JSON.parse(this.result)
					ng.isOldWallet = ng.walletProvider.isOldWallet(JSONFile)
					ng._file = JSONFile
				} catch (e) {
					console.log(e)
					ng.showPrompt(e)
				}
			}

			reader.readAsText(file)
		}
	}

	showPrompt (msg: string) {
		let prompt = this.alertCtrl.create({
			title: msg
		})
		prompt.present()
	}

	login () {
		// For dev
		if (this.WIFKey === 'test') {
			this.walletProvider.wallet = JSON.parse(JSON.stringify(TEST_WALLET))
			return this.navCtrl.setRoot(TabsPage)
		}

		if (this.WIFKey && this.isWIFKey && this.passphrase) {
			if (!wallet.isWIF(this.WIFKey)) return this.showPrompt('WIF 格式错误！')
			const account = new wallet.Account(this.WIFKey)
			account.encrypt(this.passphrase)
			this.walletProvider.addAccount(account)
			this.walletProvider.saveWalletFile()
			return this.navCtrl.setRoot(TabsPage)
		}

		if (this._file && !this.isWIFKey && !this.WIFKey) {
			if (this.walletProvider.isOldWallet(this._file)) {
				this.walletProvider.upgradeAndAddToAccount(this._file, this.passphrase)
				    .then(_ => {
					    this.navCtrl.setRoot(TabsPage)
				    })
				    .catch(e => {
					    this.showPrompt('Incorrect Password! Retry again.')
				    })
			}

			if (this.walletProvider.isWallet(this._file)) {
				this.walletProvider.wallet = this._file
				this.navCtrl.setRoot(TabsPage)
			}
		}
	}
}
