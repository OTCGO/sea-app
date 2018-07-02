import { ErrorHandler, NgModule } from '@angular/core'

import { Clipboard } from '@ionic-native/clipboard'
import { NativeStorage } from '@ionic-native/native-storage'
import { SocialSharing } from '@ionic-native/social-sharing'
// import { StatusBar } from '@ionic-native/status-bar'
import { SplashScreen } from '@ionic-native/splash-screen'
import { File } from '@ionic-native/file'
import { BarcodeScanner } from '@ionic-native/barcode-scanner'

import { RouterProvider, AccountProvider, ApiProvider, WalletProvider, PriceProvider } from '../providers'
import { PossessionDetailProvider } from '../containers/possessions/possession-detail/possession-detail.provider'
import { SendModalProvider } from '../components/modals/send-modal/send-modal.provider'
import { ClaimsProvider } from '../containers/profile/claims/claims.provider'
// import { FileStorageProvider } from '../providers/file-storage.provider'
import { NotificationProvider } from '../providers/notification.provider'
import { LoadingProvider } from '../providers/loading.provider'
import { IonicErrorHandler } from 'ionic-angular'
import { Logger } from '../providers/logger.provider'
import { VersionProvider } from '../components/version/version.provider'


@NgModule({
	providers: [
		// StatusBar,
		SplashScreen,
		File,
		Clipboard,
		Logger,
		NativeStorage,
		BarcodeScanner,
		SocialSharing,
		WalletProvider,
		AccountProvider,
		ApiProvider,
		PriceProvider,
		PossessionDetailProvider,
		SendModalProvider,
		ClaimsProvider,
		VersionProvider,
	   //  FileStorageProvider,
	  	NotificationProvider,
		LoadingProvider,
		RouterProvider,
		{ provide: ErrorHandler, useClass: IonicErrorHandler },
	]
})
export class CoreModule {
	static forRoot () {
		return {
			ngModule: CoreModule
		}
	}
}
