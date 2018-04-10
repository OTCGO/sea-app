import {
	Component,
	OnInit
} from '@angular/core'
import { SplashScreen } from '@ionic-native/splash-screen'
import { StatusBar } from '@ionic-native/status-bar'
import { Store } from '@ngrx/store'
import { TranslateService } from '@ngx-translate/core'
import {
	App,
	MenuController,
	NavController,
	Platform
} from 'ionic-angular'
import 'rxjs/add/operator/take'
import { NotificationProvider } from '../providers'
import {
	SettingsActions,
	WalletActions,
	MarketsActions
} from '../store/actions'

import { RootState } from '../store/reducers'
import {
	SettingsSelectors,
	WalletSelectors
} from '../store/selectors'


@Component({
	templateUrl: 'app.html'
})
export class MyApp implements OnInit {
	rootPage: any
	public counter = 0

	constructor (
		private platform: Platform,
		private statusBar: StatusBar,
		private app: App,
		private splashScreen: SplashScreen,
		private translateService: TranslateService,
		private np: NotificationProvider,
		private store: Store<RootState>
	) {}

	ngOnInit () {
		this.initApp()
		this.store.dispatch(new MarketsActions.Load())
		this.store.dispatch(new SettingsActions.Load())
	}

	initApp () {
		this.platform.ready().then(() => {
			this.statusBar.styleDefault()
			this.splashScreen.hide()
			this.platform.registerBackButtonAction(async () => {
				const nav = this.app.getActiveNav()
				if (nav.canGoBack()) return nav.pop()
				if (this.counter === 0) {
					this.counter++
					this.translateService.get('TABS.exit_action').take(1).subscribe(message => this.np.emit(message))
					return setTimeout(() => this.counter = 0, 500)
				}
				await this.platform.ready()
				return await this.platform.exitApp()
			})

			this.initWallet()
			this.initTranslate()
		})
	}

	async initWallet () {
		this.store.dispatch(new WalletActions.Load())
		this.store.select(WalletSelectors.getExits).take(1).subscribe(exits => this.rootPage = exits ? 'Tabs' : 'Login')
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
