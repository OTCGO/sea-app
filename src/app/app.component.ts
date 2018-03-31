import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { Platform } from 'ionic-angular'
import { StatusBar } from '@ionic-native/status-bar'
import { SplashScreen } from '@ionic-native/splash-screen'
import { TranslateService } from '@ngx-translate/core'

import { RootState } from '../store/reducers'
import { MarketsActions, WalletActions, SettingsActions } from '../store/actions'
import { SettingsSelectors, WalletSelectors } from '../store/selectors'
import 'rxjs/add/operator/take'


@Component({
	templateUrl: 'app.html'
})
export class MyApp implements OnInit {
	rootPage: any

	constructor (
		private platform: Platform,
		private statusBar: StatusBar,
		private splashScreen: SplashScreen,
		private translateService: TranslateService,
		private store: Store<RootState>
	) {}

	ngOnInit () {
		this.initApp()
		// this.store.dispatch(new MarketsActions.Load())
		this.store.dispatch(new SettingsActions.Load())
	}

	initApp () {
		this.platform.ready().then(() => {

			this.statusBar.styleDefault()
			this.splashScreen.hide()

			this.initWallet().then(
				_ => {
					this.initTranslate()
				}
			)
		})
	}

	async initWallet () {
		this.store.dispatch(new WalletActions.Load())

		this.store
				.select(WalletSelectors.getExits)
				.take(1)
				.subscribe(
					exits => this.rootPage = exits ? 'Tabs' : 'Login'
				)
	}

	initTranslate () {
		this.translateService.setDefaultLang('en')

		this.store.select(SettingsSelectors.getLanguage)
				.subscribe(language => {
					const locale = language.split('-')[0]
					this.translateService.use(locale)
				})
	}
}
