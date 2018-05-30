import { Component } from '@angular/core'
import { Store } from '@ngrx/store'
import { IonicPage, NavController, App, ViewController } from 'ionic-angular'
import { TranslateService } from '@ngx-translate/core'
import { RootState } from '../../../store/reducers'
import { SettingsActions } from '../../../store/actions'
import { SettingsSelectors } from '../../../store/selectors'
import { NativeStorage } from '@ionic-native/native-storage'
import { WalletActions } from '../../../store/actions'

@IonicPage({ name: 'Settings' })
@Component({
	selector: 'page-settings',
	templateUrl: 'settings.html'
})
export class SettingsPage {
	currentLanguage = this.store.select(SettingsSelectors.getLanguage)
	currentCurrency = this.store.select(SettingsSelectors.getCurrency)
	currencies = ['cny', 'usd']
	locales = [
		{ title: '中文', locale: 'zh', enabled: true },
		{ title: 'English', locale: 'en', enabled: true }
	]

	constructor (
		private navCtrl: NavController,
		private nativeStorage: NativeStorage,
		public translateService: TranslateService,
		private store: Store<RootState>,
		private viewCtrl: ViewController,
		private appCtrl: App
	) {}

	handleLocaleClick (locale) {
		this.store.dispatch(new SettingsActions.ChangeLanguage(locale))
	}

	handleCurrencyClick (currency) {
    this.store.dispatch(new SettingsActions.ChangeCurrency(currency))
	}

	logout() {
		this.nativeStorage.clear()
		// this.navCtrl.setRoot('Login')
		this.store.dispatch(new WalletActions.RemoveAccount())
		this.viewCtrl.dismiss()
		this.appCtrl.getRootNav().setRoot('Login')
	}
}
