import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { Platform } from 'ionic-angular'
import { StatusBar } from '@ionic-native/status-bar'
import { SplashScreen } from '@ionic-native/splash-screen'
import { TranslateService } from '@ngx-translate/core'

import { RootState } from '../store/reducers'
import { MarketsActions, WalletActions } from '../store/actions'
import { WalletSelectors } from '../store/selectors'


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
				.subscribe(
					exits => this.rootPage = exits ? 'Tabs' : 'Login'
				)
	}

	initTranslate () {
		this.translateService.setDefaultLang('en')

		if (this.translateService.getBrowserLang() !== undefined) {
			const locale = this.translateService.getBrowserLang()

			this.translateService.use(locale)
		} else {
			this.translateService.use('en')
		}
	}
}
