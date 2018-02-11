import { Component, enableProdMode } from '@angular/core'
import { Platform } from 'ionic-angular'
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen'

import { TabsPage } from '../containers/tabs/tabs';
import { WalletProvider } from '../providers/wallet/wallet.provider'

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = TabsPage;

  constructor (
    private platform: Platform,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private walletProvider: WalletProvider
  ) {
    if (this.platform.is('ios') || this.platform.is('android')) enableProdMode()
    this.splashScreen.show()
    this.appReady()
  }

  appReady () {
    this.platform.ready().then(() => {



      this.statusBar.styleDefault();
      this.splashScreen.hide()

      this.rootPage = this.walletProvider.haveAnAccount()
        ? 'Tabs'
        : 'Login'
    });
  }
}
