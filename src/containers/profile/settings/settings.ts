import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { IonicPage, NavController, App, ViewController, Platform } from 'ionic-angular'
import { TranslateService } from '@ngx-translate/core'
import { RootState } from '../../../store/reducers'
import { SettingsActions } from '../../../store/actions'
import { SettingsSelectors } from '../../../store/selectors'
import { NativeStorage } from '@ionic-native/native-storage'
import { WalletActions } from '../../../store/actions'
import { version } from '@app/env'
import { Clipboard } from '@ionic-native/clipboard'
import { NotificationProvider } from '../../../providers/notification.provider'

@IonicPage({ name: 'Settings' })
@Component({
	selector: 'page-settings',
	templateUrl: 'settings.html'
})
export class SettingsPage implements OnInit {
	currentLanguage = this.store.select(SettingsSelectors.getLanguage)
	currentCurrency = this.store.select(SettingsSelectors.getCurrency)
	currencies = ['cny', 'usd']
	locales = [
		{ title: '中文', locale: 'zh', enabled: true },
		// { title: 'English', locale: 'en', enabled: true }
	]

	private appVersion
	private addressList
	private display

	constructor(
		private navCtrl: NavController,
		private nativeStorage: NativeStorage,
		public translateService: TranslateService,
		private store: Store<RootState>,
		private viewCtrl: ViewController,
		private appCtrl: App,
		private clipboard: Clipboard,
		private platform: Platform,
		private np: NotificationProvider,
	) {
		this.appVersion = version
		// console.log('this.appVersion', this.appVersion)
	}
	async ngOnInit() {

		// const result = await this.nativeStorage.getItem('addressList')
		// console.log('result', result)
		// if (result) {
		// 	result.push({ encrypted, address, isDefault: true })
		// 	await this.nativeStorage.setItem('addressList', result)
		// } else {
		// 	await this.nativeStorage.setItem('addressList', [{ encrypted, address, isDefault: true }])
		// }
	}

	handleLocaleClick(locale) {
		this.store.dispatch(new SettingsActions.ChangeLanguage(locale))
	}

	handleCurrencyClick(currency) {
		this.store.dispatch(new SettingsActions.ChangeCurrency(currency))
	}

	logout() {
		// this.nativeStorage.clear()
		// this.navCtrl.setRoot('Login')
		this.nativeStorage.remove('account')
		this.store.dispatch(new WalletActions.RemoveAccount())
		this.viewCtrl.dismiss()
		this.appCtrl.getRootNav().setRoot('Login')
	}

	copy(value) {
		console.log('this.platform', this.platform)
		// console.log('element', element)
		if (this.platform.is('mobileweb')) {
			try {
				const el = document.createElement('textarea')
				el.value = value
				document.body.appendChild(el)
				el.select()
				document.execCommand('copy')
				document.body.removeChild(el)

				return this.np.emit({ message: `copy successful` })
			} catch (err) {
				console.log('unable to copy', err)
			}
		}

		let copyText
		this.translateService.get('CW.BACKUP.success').subscribe(data => {
			copyText = data
		})


		this.clipboard.copy(value).then(() => this.np.emit({ message: copyText })).catch()
	}

	async btnSelected(item) {


		this.store.dispatch(new WalletActions.RemoveAccount())
		this.viewCtrl.dismiss()

		await this.nativeStorage.setItem('account', { encrypted: item.encrypted, address: item.address })

		this.appCtrl.getRootNav().setRoot('Login')

	}

	openAddresstLis() {
		this.navCtrl.push('AddressList')
	}
}
