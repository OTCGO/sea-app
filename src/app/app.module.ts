import { NgModule, ErrorHandler, Injector, Injectable } from '@angular/core'
import { HttpClientModule } from '@angular/common/http'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ReactiveFormsModule } from '@angular/forms'
import { Pro } from '@ionic/pro'

import { StatusBar } from '@ionic-native/status-bar'
import { SplashScreen } from '@ionic-native/splash-screen'
import { File } from '@ionic-native/file'

import {
  IonicApp, IonicModule, IonicErrorHandler,
} from 'ionic-angular'

import { MyApp } from './app.component'

import { ApiProvider, AccountProvider, WalletProvider, PriceProvider } from '../providers'
import { PossessionsProvider } from '../containers/possessions/possessions.provider'
import { QRScanner } from '@ionic-native/qr-scanner'
import { Clipboard } from '@ionic-native/clipboard'
import { SocialSharing } from '@ionic-native/social-sharing'
import { PossessionDetailProvider } from '../containers/possessions/possession-detail/possession-detail.provider'
import { SendModalProvider } from '../components/modals/send-modal/send-modal.provider'
import { ClaimsProvider } from '../containers/claims/claims.provider'

Pro.init('52f9b83b', {
  appVersion: '0.1.1'
})

@Injectable()
export class MyErrorHandler implements ErrorHandler {
  ionicErrorHandler: IonicErrorHandler

  constructor (injector: Injector) {
    try {
      this.ionicErrorHandler = injector.get(IonicErrorHandler)
    } catch (e) {

    }
  }

  handleError(err: any): void {
    Pro.monitoring.handleNewError(err);
    // Remove this if you want to disable Ionic's auto exception handling
    // in development mode.
    this.ionicErrorHandler && this.ionicErrorHandler.handleError(err);
  }
}

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    IonicModule.forRoot(MyApp, {
      tabbarPlacement: 'bottom',
      preloadModules: true,
      backButtonText: '',
      }
    )
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp],
  providers: [
    StatusBar,
    SplashScreen,
    File,
    QRScanner,
    Clipboard,
    SocialSharing,
    WalletProvider,
    ApiProvider,
    PriceProvider,
    PossessionsProvider,
    PossessionDetailProvider,
    SendModalProvider,
    AccountProvider,
    ClaimsProvider,
    { provide: ErrorHandler, useClass: MyErrorHandler }
  ]
})
export class AppModule {
}
