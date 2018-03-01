import { Component, OnInit } from '@angular/core'
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
import { contains } from '../../shared/utils'
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';



interface LoginFormValue {
	wif: string,
	passphrase: string
}

@IonicPage({
	name: 'Login',
	segment: 'login'
})
@Component({
	selector: 'page-login',
	templateUrl: 'login.html',
})
export class LoginPage implements OnInit {
	private _file
	createWalletPage = CreateWalletPage
	importText: string = '导入'
	isWIFKey: boolean = true
	loginForm: FormGroup

	get wif () { return this.loginForm.get('wif') }
	get passphrase () { return this.loginForm.get('passphrase') }

	constructor (
		public navCtrl: NavController,
		public navParams: NavParams,
		public alertCtrl: AlertController,
		private walletProvider: WalletProvider,
		private fb: FormBuilder
	) { }

	ngOnInit () {
		this.loginForm = this.fb.group({
			wif: [
				'', [
					Validators.required
				], [
					wifValidator.bind(this)
				]
			],
			passphrase: [
				'', [
					Validators.required,
					Validators.minLength(4)
				]
			]
		})
	}

	switchImportBox (fileInput: HTMLInputElement) {
		this.isWIFKey = false
		this.importText = '导入钱包文件'
		if (window.navigator && !this.wif.value) fileInput.click()
	}

	switchWIFKeyBox () {
		this.isWIFKey = true
		this.importText = '导入'
	}

	fileChange (file) {
		if (contains(file.name, '.json')) {
			this.importText = file.name.slice()
			const reader = new FileReader()
			const ng = this

			// In onload function `this` is reference to reader itself
			reader.onload = function () {
				try {
					const JSONFile = JSON.parse(this.result)
					if (ng.walletProvider.isOldWallet(JSONFile) || ng.walletProvider.isWallet(JSONFile)) {
						ng._file = JSONFile
					} else {
						throw new Error('钱包格式错误！')
					}
				} catch (e) {
					console.log('file change error', e)
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

	login ({
					 controls,
					 value,
					 valid
				 }: {
		controls: any,
		value: LoginFormValue,
		valid: boolean
	}) {

		const { wif: wifValue, passphrase: passphraseValue } = value
		const { wif, passphrase } = controls

		if (wifValue === 'test') {
			this.walletProvider.wallet = JSON.parse(JSON.stringify(TEST_WALLET))
			return this.navCtrl.setRoot(TabsPage)
		}

		if (!passphrase.valid) return

		if (wifValue && this.isWIFKey && passphraseValue) {

			const account = new wallet.Account(wifValue)
			account.encrypt(passphraseValue)
			account.isDefault = true
			this.walletProvider.addAccount(account)
			this.walletProvider.saveWallet()
			return this.navCtrl.setRoot(TabsPage)
		}

		if (this._file && !this.isWIFKey && !wifValue) {
			if (this.walletProvider.isOldWallet(this._file)) {
				this.walletProvider.upgradeAndAddToAccount(this._file, passphraseValue)
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

function wifValidator (wifCtrl: FormControl): Observable<ValidationErrors | null> {
	return Observable.create(obs =>
		wifCtrl
			.valueChanges
			.debounceTime(400)
			.map(value => value.trim())
			.map(value => {
				if (value && wallet.isWIF(value)) {
					return null
				}
				throw new Error ('invalidWIF')
			})
			.subscribe(
				value => obs.next(null),
				error => {
					obs.next({ [error.message]: true })
					obs.complete()
				}
			)

	)
}
