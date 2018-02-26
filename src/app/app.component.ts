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
		if (this.platform.is('mobile')) {
			this.walletProvider.dataDirectory = this.file.dataDirectory

			return this.walletProvider
			    .checkWalletExists()
			    .then(exist => {
				    if (exist) {
					    console.log('file exists')
					    this.walletProvider
					        .readWallet()
					        .then((walletStr: string) => {
						        this.walletProvider.wallet = JSON.parse(walletStr)
						        this.rootPage = 'Tabs'
						        console.log('wallet is loaded', JSON.parse(walletStr))
					        })
					        .catch(err => {
						        console.log('read file error', err)
					        })

				    } else {
					    console.error('can not find wallet')
					    this.walletProvider.initWallet()
					    this.rootPage = 'Login'
				    }
			    })
		} else {
			this.walletProvider.initWallet()
			this.rootPage = 'Login'
			return Promise.resolve()
		}
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
