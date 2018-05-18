import { Component } from '@angular/core'
import { Store } from '@ngrx/store'
import { IonicPage } from 'ionic-angular'
import { TranslateService } from '@ngx-translate/core'
import { RootState } from '../../../store/reducers'
import { SettingsActions } from '../../../store/actions'
import { SettingsSelectors } from '../../../store/selectors'

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
		public translateService: TranslateService,
		private store: Store<RootState>
	) {}

	handleLocaleClick (locale) {
		this.store.dispatch(new SettingsActions.ChangeLanguage(locale))
	}

	handleCurrencyClick (currency) {
    this.store.dispatch(new SettingsActions.ChangeCurrency(currency))
  }
}
