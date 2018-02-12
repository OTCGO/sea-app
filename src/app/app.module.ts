import { NgModule, ErrorHandler } from '@angular/core'
import { HttpClientModule } from '@angular/common/http'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ReactiveFormsModule } from '@angular/forms'

import { StatusBar } from '@ionic-native/status-bar'
import { SplashScreen } from '@ionic-native/splash-screen'
import { File } from '@ionic-native/file'

import {
  IonicApp, IonicModule, IonicErrorHandler,
} from 'ionic-angular'

import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'

// not used in production
import { StoreDevtoolsModule } from '@ngrx/store-devtools'

import { MyApp } from './app.component'

import { ApiProvider, AccountProvider, WalletProvider, PriceProvider } from '../providers'
import { PossessionsProvider } from '../containers/possessions/possessions.provider'
import { QRScanner } from '@ionic-native/qr-scanner'
import { Clipboard } from '@ionic-native/clipboard'
import { SocialSharing } from '@ionic-native/social-sharing'
import { PossessionDetailProvider } from '../containers/possessions/possession-detail/possession-detail.provider'
import { SendModalProvider } from '../components/modals/send-modal/send-modal.provider'
import { ClaimsProvider } from '../containers/claims/claims.provider'

import { dev } from '../environments/environment'



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
    ),
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),
    dev ? StoreDevtoolsModule.instrument() : []
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
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
