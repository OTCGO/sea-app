import { Component } from '@angular/core'
import { Platform } from 'ionic-angular'
import { StatusBar } from '@ionic-native/status-bar'
import { SplashScreen } from '@ionic-native/splash-screen'
import { File } from '@ionic-native/file'
import { TranslateService } from '@ngx-translate/core'

import { WalletProvider } from '../providers/wallet/wallet.provider'


@Component({
	templateUrl: 'app.html'
})
export class MyApp {
	rootPage: any

	constructor (
		private file: File,
		private platform: Platform,
		private statusBar: StatusBar,
		private splashScreen: SplashScreen,
		private walletProvider: WalletProvider,
	  private translateService: TranslateService
	) {
		this.initApp()
	}

	initApp () {
		this.platform.ready().then(() => {

			this.statusBar.styleDefault()
			this.splashScreen.hide()

			this.initWallet().then(
				_=> this.initTranslate()
			)
		})
	}

	initWallet () {
		if (this.platform.is('mobile'))
			this.walletProvider.initWallet()
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
}
