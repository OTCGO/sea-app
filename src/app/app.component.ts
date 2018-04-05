import {
	Component,
	OnInit
} from '@angular/core'
import { SplashScreen } from '@ionic-native/splash-screen'
import { StatusBar } from '@ionic-native/status-bar'
import { Store } from '@ngrx/store'
import { TranslateService } from '@ngx-translate/core'
import {
	MenuController,
	NavController,
	Platform
} from 'ionic-angular'
import 'rxjs/add/operator/take'
import { NotificationProvider } from '../providers'
import {
	SettingsActions,
	WalletActions
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
		private splashScreen: SplashScreen,
		private translateService: TranslateService,
		private np: NotificationProvider,
		private store: Store<RootState>
	) {}

	ngOnInit () {
		this.initApp()
		// this.store.dispatch(new MarketsActions.Load())
		this.store.dispatch(new SettingsActions.Load())
	}

	initApp () {
		this.platform.ready().then(() => {

			this.platform.registerBackButtonAction(this.registerBackButtonAction, 0)
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

	registerBackButtonAction () {
		if (this.counter === 0) {
			this.counter++
			this.translateService.get('TABS.exit_action').take(1).subscribe(message => this.np.emit(message))
			setTimeout(() => this.counter = 0, 3000)
		} else {
			this.platform.exitApp()
		}
	}
}
