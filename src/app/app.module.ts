import { NgModule, ErrorHandler } from '@angular/core'
import { HttpClient, HttpClientModule } from '@angular/common/http'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ReactiveFormsModule } from '@angular/forms'

import { TranslateLoader, TranslateModule } from '@ngx-translate/core'
import { TranslateHttpLoader } from '@ngx-translate/http-loader'

import { IonicApp, IonicModule, IonicErrorHandler, } from 'ionic-angular'

import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'

import { MyApp } from './app.component'
import { dev } from '../environments/environment'
import { reducers } from '../reducers'
import { CoreModule } from './core.module'
import { BalancesEffects } from '../effects/balances.effect'


@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    StoreModule.forRoot(reducers, { }),
    dev ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([BalancesEffects]),
    IonicModule.forRoot(MyApp, {
      tabbarPlacement: 'bottom',
      preloadModules: true,
      backButtonText: '',
      backButtonIcon: 'ios-arrow-back',
      tabsHideOnSubPages: true,
      scrollPadding: false,
      scrollAssist: false
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => new TranslateHttpLoader(http, './assets/i18n/', '.json'),
        deps: [HttpClient]
      }
    }),
    CoreModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler },
  ]
})
export class AppModule { }
