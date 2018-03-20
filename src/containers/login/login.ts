import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import {
	AlertController, IonicPage,
	NavController,
	NavParams
} from 'ionic-angular'

import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { LoadingProvider, NotificationProvider } from '../../providers'
import { nep5Wallet } from '../../shared/userWallet'
import { RootState } from '../../store/reducers'
import { wifValidator } from './login.validator'
import { isOldWallet, isWallet } from '../../shared/utils'
import { AuthActions } from '../../store/actions'
import { AuthSelectors } from '../../store/selectors'
import { WalletSelectors } from '../../store/selectors'

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
	file
	importText: string = '导入'
	isWIFKey: boolean = true
	loginForm: FormGroup
	isOldWallet: boolean = false

	get wif () { return this.loginForm.get('wif') }
	get passphrase () { return this.loginForm.get('passphrase') }

	constructor (
		public navCtrl: NavController,
		public navParams: NavParams,
		public alertCtrl: AlertController,
		private fb: FormBuilder,
		private np: NotificationProvider,
		private lp: LoadingProvider,
		private store: Store<RootState>
	) { }

	ngOnInit () {
		this.buildForm()
		this.subscribe()
	}

	buildForm () {
		this.loginForm = this.fb.group({
			wif: [
				'',
				[Validators.required],
				[wifValidator.bind(this)]
			],
			passphrase: [
				'', [
					Validators.required,
					Validators.minLength(4)
				]
			]
		})
	}

	subscribe () {
		this.store.select(AuthSelectors.getError)
				.subscribe(error => error && this.np.emit({ message: error }))
		this.store.select(AuthSelectors.getLoading)
				.subscribe(bool => bool && this.lp.emit(bool))
		this.store.select(WalletSelectors.getExits)
				.subscribe(exits => exits && this.navCtrl.setRoot('Tabs'))
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
		if (file.name.includes('.json')) {
			this.importText = file.name.slice()
			const reader = new FileReader()
			const ng = this

			// In the onload function `this` is reference to reader itself
			reader.onload = function () {
				try {
					const JSONFile = JSON.parse(this.result)
					if (isOldWallet(JSONFile)) {
						ng.file = JSONFile
						ng.isOldWallet = true
						return
					} else if (isWallet(JSONFile)) {
						ng.file = JSONFile
						ng.isOldWallet = false
						return
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


	/* TODO: Just from now, only old wallet format is required with passphrase login. */
	login ({
		 controls,
		 value,
		 valid  // TODO: Valid use at loginForm but don't have capability with nowif or file logic
  }: {
		controls: {
			[key: string]: AbstractControl
		},
		value: LoginFormValue,
		valid: boolean
	}) {
		const { wif: wifControl, passphrase: passphraseControl } = controls
		const { wif: wifValue, passphrase: passphraseValue } = value

		if (this.file && !this.isOldWallet) {
			wifControl.setValue('')
			passphraseControl.setValue('')
		}

		if (wifValue === 'test') {
			this.store.dispatch(new AuthActions.Login(nep5Wallet))
		}
		// Using wif login
		else if (wifValue && this.isWIFKey && !passphraseValue) {
			this.store.dispatch(new AuthActions.LoginWif(wifValue))
		}
		// Using file login
		else if (this.file && !this.isWIFKey && !wifValue) {
			if (isOldWallet(this.file)) {
				if (!passphraseControl.valid) return
				this.store.dispatch(new AuthActions.LoginOldWallet({ oldWallet: this.file, passphrase: passphraseValue }))
				console.log('Login using oldWallet')
			}
			else if (isWallet(this.file)) {
				this.store.dispatch(new AuthActions.Login(this.file))
				console.log('Login using nepWallet')
			}
		}
	}
}
