import { NgModule, ErrorHandler } from '@angular/core'
import { HttpClientModule } from '@angular/common/http'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ReactiveFormsModule } from '@angular/forms'

import { IonicApp, IonicModule, IonicErrorHandler, } from 'ionic-angular'

import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'

import { StoreDevtoolsModule } from '@ngrx/store-devtools'

import { MyApp } from './app.component'

import { dev } from '../environments/environment'
import { metaReducers, reducers } from '../reducers'
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
    StoreModule.forRoot(reducers, { metaReducers }),
    dev ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([BalancesEffects]),
    IonicModule.forRoot(MyApp, {
      tabbarPlacement: 'bottom',
      preloadModules: true,
      backButtonText: '',
    }),
    CoreModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
