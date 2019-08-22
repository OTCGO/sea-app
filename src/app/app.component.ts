import {
	Component,
	OnInit
} from '@angular/core'
import { SplashScreen } from '@ionic-native/splash-screen'
// import { StatusBar } from '@ionic-native/status-bar'
import { Store } from '@ngrx/store'
import { TranslateService } from '@ngx-translate/core'
import { NativeStorage } from '@ionic-native/native-storage'
import {
	App,
	Platform,
	NavController
} from 'ionic-angular'
import 'rxjs/add/operator/take'
import { NotificationProvider } from '../providers'
import {
	SettingsActions,
	WalletActions,
} from '../store/actions'
import { RootState } from '../store/reducers'
import {
	SettingsSelectors,
} from '../store/selectors'
import { Globalization } from '@ionic-native/globalization'
import { MessageService } from '../shared/services'
import { wallet } from '../libs/neon'


@Component({
	templateUrl: 'app.html'
})
export class MyApp implements OnInit {
	rootPage = 'Login'
	// rootPage = 'Tabs'
	public counter = 0

	constructor(
		private platform: Platform,
		private nativeStorage: NativeStorage,
		// private statusBar: StatusBar,
		private app: App,
		private splashScreen: SplashScreen,
		private translateService: TranslateService,
		private np: NotificationProvider,
		private store: Store<RootState>,
		private globalization: Globalization,
		private msgService: MessageService,
		// public navCtrl: NavController,
	) {


	}

	async ngOnInit() {
		// this.store.dispatch(new SettingsActions.Load())
		try {
			this.initApp()

			const account = await this.nativeStorage.getItem('account')


			console.log('account', account)
			if (account) {
				this.rootPage = 'Tabs'

				const acct = new wallet.Account({
					// wif,
					address: account.address,
					label: account.address,
					key: account.encrypted,
					isDefault: true
				})

				this.store.dispatch(new WalletActions.AddAccount(acct))

			}
		} catch (error) {
			console.error(error)
			this.rootPage = 'Login'
		}


	}

	initApp() {
		// this.statusBar.styleDefault()
		// // this.statusBar.overlaysWebView(false)
		// this.statusBar.backgroundColorByHexString('#ffffff')

		this.platform.ready().then(() => {
			this.splashScreen.hide()
			this.platform.registerBackButtonAction(async () => {
				console.log('registerBackButtonAction', this.msgService.msg)
				if (this.msgService.msg) {
					return this.msgService.sendMessage(this.msgService.msg)
				}


				const nav = this.app.getActiveNav()
				if (nav.canGoBack()) return nav.pop()
				if (this.counter === 0) {
					this.counter++
					this.translateService.get('TABS.exit_action').take(1).subscribe(message => this.np.emit(message))
					return setTimeout(() => this.counter = 0, 1500)
				}
				await this.platform.ready()
				return await this.platform.exitApp()
			})

			// this.initWallet()
			this.initTranslate()
		})
	}

	// async initWallet () {
	// 	this.store.dispatch(new WalletActions.Load())
	// }

	async initTranslate() {
		try {
			this.translateService.addLangs(['zh', 'en'])
			this.translateService.setDefaultLang('zh')

			const syslan = await this.globalization.getPreferredLanguage()
			console.log('syslan', syslan)
			// .then(res => console.log(res))
			// .catch(e => console.log(e))
			const locale = syslan.value.split('-')[0]
			this.translateService.use(locale || 'zh')


		} catch (error) {
			this.store.select(SettingsSelectors.getLanguage)
				.subscribe(language => {
					const locale = language.split('-')[0]
					this.translateService.use(locale || 'zh')
				})
		}

	}
}
