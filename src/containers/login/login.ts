import {
	Component,
	OnDestroy,
	OnInit
} from '@angular/core'

import {
	AbstractControl,
	FormBuilder,
	FormGroup,
	Validators
} from '@angular/forms'
import { Store } from '@ngrx/store'
import { TranslateService } from '@ngx-translate/core'
import {
	AlertController,
	IonicPage,
	NavController,
	NavParams
} from 'ionic-angular'
import { Subject } from 'rxjs/Subject'
import {
	LoadingProvider,
	NotificationProvider
} from '../../providers'
import { nep5Wallet } from '../../shared/userWallet'
import {
	isOldWallet,
	isWallet
} from '../../shared/utils'
import { AuthActions } from '../../store/actions'
import { RootState } from '../../store/reducers'
import {
	AuthSelectors,
} from '../../store/selectors'
import { wifValidator } from './login.validator'

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
export class LoginPage implements OnInit, OnDestroy {
	file
	importText
	importTextShort: 'Import' | '导入'
	importTextLong: 'Import Wallet File' | '导入钱包文件'
	isWIFKey = true
	isOldWallet = false
	loginForm: FormGroup
	translationPrefix = 'LOGIN.'
	onDestroy = new Subject()

	constructor (
		public navCtrl: NavController,
		public navParams: NavParams,
		public alertCtrl: AlertController,
		private fb: FormBuilder,
		private np: NotificationProvider,
		private lp: LoadingProvider,
		private ts: TranslateService,
		private store: Store<RootState>
	) { }

	get wif () { return this.loginForm.get('wif') }

	get passphrase () { return this.loginForm.get('passphrase') }

	ngOnInit () {
		this.buildForm()
		this.subscribe()
		this.getTranslations()
	}

	ngOnDestroy () {
		this.onDestroy.next()
	}

	getTranslations () {
		const texts = ['import_long', 'import_short']
		const translations = texts.map(s => this.translationPrefix + s)
		this.ts.get(translations).subscribe(trs => {
			this.importTextLong = trs[translations[0]]
			this.importTextShort = trs[translations[1]]
		})
		this.importText = this.importTextShort
	}

	buildForm () {
		this.loginForm = this.fb.group({
			wif: [
				'',
				[Validators.required],
				[wifValidator]
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
		this.store.select(AuthSelectors.getError).subscribe(error => error && this.np.emit({ message: error }))
		this.store.select(AuthSelectors.getLoading).subscribe(bool => bool && this.lp.emit(bool))
	}

	switchImportBox (fileInput: HTMLInputElement) {
		this.isWIFKey = false
		this.importText = this.importTextLong
		if (window.navigator && !this.wif.value) {
			fileInput.click()
		}
	}

	switchWIFKeyBox () {
		this.isWIFKey = true
		this.importText = this.importTextShort
	}

	fileChange (file) {
		if (/.json$/.test(file.name)) {
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
		const prompt = this.alertCtrl.create({
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
		} else if (wifValue && this.isWIFKey && !passphraseValue) {
			if (wifControl.invalid) return
			return this.store.dispatch(new AuthActions.LoginWif(wifValue))
		} else if (this.file && !this.isWIFKey && !wifValue) {
			if (isOldWallet(this.file)) {
				if (!passphraseControl.valid) return
				return this.store.dispatch(new AuthActions.LoginOldWallet({ oldWallet: this.file, passphrase: passphraseValue }))
			} else if (isWallet(this.file)) {
				return this.store.dispatch(new AuthActions.Login(this.file))
			}
		}
	}
}
