import { NgModule } from '@angular/core';


import { Clipboard } from '@ionic-native/clipboard'
import { SocialSharing } from '@ionic-native/social-sharing'
import { StatusBar } from '@ionic-native/status-bar'
import { SplashScreen } from '@ionic-native/splash-screen'
import { File } from '@ionic-native/file'

import { ApiProvider, AccountProvider, WalletProvider, PriceProvider } from '../providers'
import { PossessionDetailProvider } from '../containers/possessions/possession-detail/possession-detail.provider'
import { SendModalProvider } from '../components/modals/send-modal/send-modal.provider'
import { ClaimsProvider } from '../containers/claims/claims.provider'
import { BarcodeScanner } from '@ionic-native/barcode-scanner'


@NgModule({
	providers: [
		StatusBar,
		SplashScreen,
		File,
		Clipboard,
		BarcodeScanner,
		SocialSharing,
		WalletProvider,
		ApiProvider,
		PriceProvider,
		PossessionDetailProvider,
		SendModalProvider,
		AccountProvider,
		ClaimsProvider,
	]
})
export class CoreModule {
	static forRoot () {
		return {
			ngModule: CoreModule
		}
	}
}

