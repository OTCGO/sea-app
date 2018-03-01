import { Component } from '@angular/core'
import { Platform, ToastController, ToastOptions } from 'ionic-angular'
import { StatusBar } from '@ionic-native/status-bar'
import { SplashScreen } from '@ionic-native/splash-screen'
import { TranslateService } from '@ngx-translate/core'

import { WalletProvider } from '../providers/wallet/wallet.provider'
import { NotificationProvider } from '../providers/notification.provider'


@Component({
	templateUrl: 'app.html'
})
export class MyApp {
	rootPage: any

	constructor (
		private platform: Platform,
		private statusBar: StatusBar,
		private splashScreen: SplashScreen,
		private toastCtrl: ToastController,
		private walletProvider: WalletProvider,
	  private notificationProvider: NotificationProvider,
	  private translateService: TranslateService
	) {

	}

	ngOnInit () {
		this.initApp()
	}

	initApp () {
		this.platform.ready().then(() => {

			this.statusBar.styleDefault()
			this.splashScreen.hide()

			this.initWallet().then(
				_=> {
					this.initTranslate()
					this.subscribeNotification()
				}
			)
		})
	}

	async initWallet () {
		const fileExits = await this.walletProvider.checkWalletFile()
		if (!fileExits)
			this.walletProvider.setWallet()
		this.rootPage = fileExits ? 'Tabs' : 'Login'
	}

	initTranslate () {
		this.translateService.setDefaultLang('en')

		if (this.translateService.getBrowserLang() !== undefined) {
			const locale = this.translateService.getBrowserLang()

			this.translateService.use(locale);
		} else {
			this.translateService.use('en');
		}
	}

	subscribeNotification () {
		this.notificationProvider.notification$.subscribe((opts: ToastOptions) => this.showNotification(opts))
	}

	showNotification (opts: ToastOptions) {
		const toastOptions = Object.assign({
			dismissOnPageChange: true,
			position: 'bottom',
			duration: 3000
		}, opts)

		const toast = this.toastCtrl.create(toastOptions)
		toast.present()
	}
}
