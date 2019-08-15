import { NgModule } from '@angular/core'
import { HttpClient, HttpClientModule } from '@angular/common/http'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ReactiveFormsModule } from '@angular/forms'

import { TranslateLoader, TranslateModule } from '@ngx-translate/core'
import { TranslateHttpLoader } from '@ngx-translate/http-loader'

import { IonicApp, IonicModule } from 'ionic-angular'

import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { DBModule } from '@ngrx/db'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { Globalization } from '@ionic-native/globalization'

import { MyApp } from './app.component'
import { dev } from '@app/env' 
import { reducers, metaReducers } from '../store/reducers'
import { schema } from './db-schema'
import { CoreModule } from './core.module'
import { InAppBrowser } from '@ionic-native/in-app-browser'
import { PipesModule } from '../pipes/pipes.module'
import { MessageService } from '../shared/services'

import {
  BalancesEffects,
  MarketsEffects,
  ContactsEffects,
  AuthEffects,
  WalletEffects,
  TransactionHistoryEffects,
  SettingsEffects,
  ClaimsEffects,
  VersionEffects
} from '../store/effects'

const LoaderFactory = (http: HttpClient) => new TranslateHttpLoader(http, 'assets/i18n/', '.json')


@NgModule({
  declarations: [MyApp],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    dev ? StoreDevtoolsModule.instrument() : [],
    DBModule.provideDB(schema),
    EffectsModule.forRoot([
      BalancesEffects,
      MarketsEffects,
      WalletEffects,
      ContactsEffects,
      AuthEffects,
      TransactionHistoryEffects,
      SettingsEffects,
      ClaimsEffects,
      VersionEffects
    ]),
    IonicModule.forRoot(MyApp, {
      tabbarPlacement: 'bottom',
      preloadModules: false,
      backButtonText: '',
      backButtonIcon: 'ios-arrow-back',
      tabsHideOnSubPages: true,
      scrollPadding: false,
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: LoaderFactory,
        deps: [HttpClient]
      }
    }),
    CoreModule.forRoot(),
    PipesModule
  ],
  providers: [
    InAppBrowser,
    Globalization,
    MessageService
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp]
})
export class AppModule { }
