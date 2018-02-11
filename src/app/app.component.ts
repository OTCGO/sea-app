import { Component } from '@angular/core'
import { Platform } from 'ionic-angular'
import { StatusBar } from '@ionic-native/status-bar'
import { SplashScreen } from '@ionic-native/splash-screen'

import { WalletProvider } from '../providers/wallet/wallet.provider'
import { File } from '@ionic-native/file'

@Component({
	templateUrl: 'app.html'
})
export class MyApp {
	rootPage: any

	constructor (
		private platform: Platform,
		private statusBar: StatusBar,
		private splashScreen: SplashScreen,
		private walletProvider: WalletProvider,
	  private file: File
	) {
		this.appReady()
	}

	appReady () {
		this.platform.ready().then(() => {

			this.statusBar.styleDefault()
			this.splashScreen.hide()
			console.log('magic from app component')

			if (this.platform.is('mobile')) {
				this.walletProvider.dataDirectory = this.file.dataDirectory
				console.log('magic from wallet provider')

				this.walletProvider
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
			}
		})
	}
}
