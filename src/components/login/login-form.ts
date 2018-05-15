import {
	Component,
	EventEmitter,
	Input,
	OnInit,
	Output,
} from '@angular/core'
import {
	FormBuilder,
	FormGroup,
	Validators
} from '@angular/forms'
import { TranslateService } from '@ngx-translate/core'
import { AlertController } from 'ionic-angular'

import { WIFValidator, asyncWIFValidator } from './login.validator'
import { isOldWallet, isWallet } from '../../shared/utils'


@Component({
	selector: 'login-form',
	templateUrl: `login-form.html`
})
export class LoginForm implements OnInit {
	@Input() tip: string
	@Output() onPrivateKey = new EventEmitter()
	@Output() onOldWallet = new EventEmitter()
	@Output() onNEP5 = new EventEmitter()
	@Output() onWIF = new EventEmitter()


	file
	importText
	importTextShort: 'Import' | '导入'
	importTextLong: 'Import Wallet File' | '导入钱包文件'
	isWIFKey = true
	isOldWallet = false
	loginForm: FormGroup
	translationPrefix = 'LOGIN.'

	constructor (
		private fb: FormBuilder,
		private ts: TranslateService,
		private alertCtrl: AlertController
	) {}

	get wif () { return this.loginForm.get('wif') }
	get passphrase () { return this.loginForm.get('passphrase') }

	ngOnInit () {
		this.loginForm = this.fb.group({
			wif: ['', [Validators.required, WIFValidator], asyncWIFValidator],
			passphrase: ['', [Validators.required, Validators.minLength(4)]]
		})
		this.getTranslations()
	}

	getTranslations () {
		const texts = ['import_long', 'import_short']
		const translations = texts.map(text => this.translationPrefix + text)
		this.ts.get(translations).subscribe(trs => {
			this.importTextLong = trs[translations[0]]
			this.importTextShort = trs[translations[1]]
		})
		this.importText = this.importTextShort
	}

	switchImportBox (fileInput: HTMLInputElement) {
		this.isWIFKey = false
		this.importText = this.importTextLong
		if (window.navigator && !this.wif.value) fileInput.click()
	}

	switchWIFKeyBox () {
		this.isWIFKey = true
		this.importText = this.importTextShort
	}

	showPrompt = (msg: string) => this.alertCtrl.create({ title: msg }).present()

	fileChange (file) {
		if (/.json$/.test(file.name)) {
			const reader = new FileReader()
			const ng = this

			// In the onload function `this` is reference to reader itself
			reader.onload = function () {
				try {
					const JSONFile = JSON.parse(this.result)

					if (isOldWallet(JSONFile)) {
						ng.file = JSONFile
						ng.isOldWallet = true
						ng.importText = file.name
						return
					} else if (isWallet(JSONFile)) {
						ng.file = JSONFile
						ng.isOldWallet = false
						ng.importText = file.name
						return
					}
					throw new Error()
				} catch (e) {
					console.log('file change error', e)
					ng.showPrompt('Invalid wallet file')
				}
			}

			reader.readAsText(file)
			return
		}

		console.log('invalid file', file)
		return this.showPrompt('Invalid wallet file')
	}

	login ({ controls, value }) {
		const { file, isWIFKey } = this
		const { wif: wifControl, passphrase: passphraseControl } = controls
		const { wif: wifValue, passphrase: passphraseValue } = value

		if (file && !this.isOldWallet) {
			wifControl.setValue('')
			passphraseControl.setValue('')
		}

		if (wifValue && isWIFKey && !passphraseValue) {
			if (wifControl.invalid && wifValue !== 'test') return
			return this.onWIF.emit(wifValue)
		} else if (file && !isWIFKey && !wifValue) {
			if (isOldWallet(file)) {
				if (!passphraseControl.valid) return
				return this.onOldWallet.emit({ oldWallet: file, passphrase: passphraseValue })
			} else if (isWallet(file)) {
				return this.onNEP5.emit(file)
			}
		}
	}
}
