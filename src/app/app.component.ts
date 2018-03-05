import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { Platform, ToastController, ToastOptions } from 'ionic-angular'
import { StatusBar } from '@ionic-native/status-bar'
import { SplashScreen } from '@ionic-native/splash-screen'
import { TranslateService } from '@ngx-translate/core'
import { RootState } from '../store/reducers'
import { WalletProvider } from '../providers/wallet/wallet.provider'
import { NotificationProvider } from '../providers/notification.provider'
import * as marketsActions from '../store/actions/markets.action'

export interface notificationOpts {
	message: string | Error,
	position?: string,
	duration?: number
}

@Component({
	templateUrl: 'app.html'
})
export class MyApp implements OnInit {
	rootPage: any

	constructor (
		private platform: Platform,
		private statusBar: StatusBar,
		private splashScreen: SplashScreen,
		private walletProvider: WalletProvider,
	  private translateService: TranslateService,
		private store: Store<RootState>
	) {}

	ngOnInit () {
		this.initApp()
		this.store.dispatch(new marketsActions.Load())
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
		this.walletProvider.checkWalletFile().then(fileExits => {
			if (!fileExits) {
				this.rootPage = 'Login'
				return this.walletProvider.setWallet()
			}
			this.walletProvider.readWalletFile().then(
				(walletFile) => {
					const file = JSON.parse(walletFile)
					this.walletProvider.setWallet(file)
							.then(_ => {
									this.rootPage = 'Tabs'
								}
							)
				}
			)

		})

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
