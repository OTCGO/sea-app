import { NgModule } from '@angular/core'
import { HttpClient, HttpClientModule } from '@angular/common/http'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ReactiveFormsModule } from '@angular/forms'
import { StatusBar } from '@ionic-native/status-bar'


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
import { MessageService, MenuService, NodeService } from '../shared/services'

import { Wechat } from '@ionic-native/wechat';
import { FileTransfer } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { PhotoLibrary } from '@ionic-native/photo-library';

import {
  BalancesEffects,
  MarketsEffects,
  ContactsEffects,
  AuthEffects,
  WalletEffects,
  TransactionHistoryEffects,
  SettingsEffects,
  ClaimsEffects,
  VersionEffects,
  NodeEffects,
  BonusEffects
} from '../store/effects'

const LoaderFactory = (http: HttpClient) => new TranslateHttpLoader(http, 'assets/i18n/', '.json')


@NgModule({
  declarations: [MyApp],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    // StoreModule.forRoot(reducers, { metaReducers }),
    StoreModule.forRoot(reducers),
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
      VersionEffects,
      NodeEffects,
      BonusEffects
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
    FileTransfer,
    StatusBar,
    File,
    Wechat,
    InAppBrowser,
    Globalization,
    MessageService,
    MenuService,
    NodeService,
    PhotoLibrary
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp]
})
export class AppModule { }
