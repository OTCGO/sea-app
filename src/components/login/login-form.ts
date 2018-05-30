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
import { AlertController, LoadingController, Platform } from 'ionic-angular'
import { File } from '@ionic-native/file'
import { NativeStorage } from '@ionic-native/native-storage'
import { keyValidator, asyncKeyValidator } from './login.validator'
import { isNEP2, isWIF, isOldWallet, isWallet } from '../../shared/utils'
import { wallet } from '../../libs/neon/src'



@Component({
	selector: 'login-form',
	templateUrl: `login-form.html`
})
export class LoginForm implements OnInit {

	@Input() tip: string
	@Input() isSwitch: boolean

	@Output() onPrivateKey = new EventEmitter()
	@Output() onOldWallet = new EventEmitter()
	@Output() onNEP5 = new EventEmitter()
	@Output() onWIF = new EventEmitter()
	@Output() onNEP2 = new EventEmitter()


	file
	importText
	importTextShort: 'Import' | '导入'
	importTextLong: 'Import Wallet File' | '导入钱包文件'
	isKey = true
  	isWIF = true
	isOldWallet = false
	loginForm: FormGroup
	translationPrefix = 'LOGIN.'
	accountCache = undefined


	constructor (
		private nativeStorage: NativeStorage,
		private fb: FormBuilder, private ts: TranslateService,
		private loadingCtrl: LoadingController,
		private alertCtrl: AlertController,
		private platform: Platform,
		private Cfile: File
		) {}

	get key () { return this.loginForm.get('key') }
	get passphrase () { return this.loginForm.get('passphrase') }

	ngOnInit () {
		console.log('ngOnInit:isSwitch', this.isSwitch)
		this.isSwitch = false
		this.platform.ready().then(() => {
			this.nativeStorage.getItem('account').then((value) => {
				console.log('this.account', value )
				if (value) {
					return this.accountCache = value
				}

				this.isSwitch = true
				// console.log('this.accountCache', this.accountCache )
			  }).catch((err) => {
				console.log('this.nativeStorage:get', err )
				this.isSwitch = true
			})
		})


		this.loginForm = this.fb.group({
			key: ['', [Validators.required, keyValidator], asyncKeyValidator],
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
		this.isKey = false
		this.importText = this.importTextLong
		if (window.navigator && !this.key.value) fileInput.click()
	}

	switchWIFKeyBox () {
		this.isKey = true
    	this.isWIF = true
		this.importText = this.importTextShort
	}

	// onKeyChange ({ value }) {
		// console.log('onKeyChange', value)
		// if (wallet.isNEP2(value)) {
		// 	return this.isKey = false
		// }
		// return this.isKey = true

  	// }

	showPrompt = (msg: string) => this.alertCtrl.create({ title: msg }).present()

	async fileChange (file) {

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
		// console.log('file', file)

		/*
		if (this.platform.is('mobileweb')) {
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
		}
		*/


		// if (this.platform.is('android')) {
		// 	const fs: string = cordova.file.externalRootDirectory
		// 	const string = await this.Cfile.readAsText(fs, file)
		// 	this.showPrompt(string)
		// }


		console.log('invalid file', file)
		return this.showPrompt('Invalid wallet file')
	}

	async login ({ controls, value }: FormGroup) {
		try {
			// console.log('login', this.accountCache.encrypted)
			// const loading = this.loadingCtrl.create()
			// loading.present()


			// setTimeout(() => {
			// 	if (loading) {
			// 		loading.dismiss().catch(() => {})
			// 	}

			// }, 1000)

			const { key: keyValue, passphrase: passphraseValue } = value



			if (!passphraseValue) {
				return
			}
			// if (!keyValue) {
			// 	return
			// }
			// nep2 input
			if (this.isSwitch) {

				if (!keyValue) {
					return
				}

				return this.onNEP2.emit({ encrypted: keyValue, passphrase: passphraseValue  })
			} else {
				return this.onNEP2.emit({ encrypted: this.accountCache.encrypted, passphrase: passphraseValue  })
			}



			// if (keyValue) {
			// 	return this.onNEP2.emit({ encrypted: keyValue, passphrase: passphraseValue  })
			// } else {
			// 	return this.onNEP2.emit({ encrypted: this.accountCache.encrypted, passphrase: passphraseValue  })
			// }



		} catch (error) {
			console.log('error', error)


		}




	// 	const { file, isKey } = this
	// 	const { key: keyControl, passphrase: passphraseControl } = controls
	// 	const { key: keyValue, passphrase: passphraseValue } = value

	// 	if (file && !this.isOldWallet) {
	// 		keyControl.setValue('')
	// 		passphraseControl.setValue('')
	// 	}

	// 	if (keyValue && isKey) {
	// 		if (keyControl.invalid && keyValue !== 'test') return
	// 		if (isWIF(keyValue) || keyValue === 'test') return this.onWIF.emit(keyValue)
    //   if (isNEP2(keyValue)) return this.onNEP2.emit({ encrypted: keyValue, passphrase: passphraseValue })
	// 	} else if (file && !isKey && !keyValue) {
	// 		if (isOldWallet(file)) {
	// 			if (!passphraseControl.valid) return
	// 			return this.onOldWallet.emit({ oldWallet: file, passphrase: passphraseValue })
	// 		} else if (isWallet(file)) {
	// 			return this.onNEP5.emit(file)
	// 		}
	// 	}
	}
}
