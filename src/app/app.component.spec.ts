import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { IonicModule, Platform, ToastController } from 'ionic-angular'
import { StatusBar } from '@ionic-native/status-bar'
import { SplashScreen } from '@ionic-native/splash-screen'
import { HttpClientTestingModule } from '@angular/common/http/testing'

import { MyApp } from './app.component'
import { File } from '@ionic-native/file'
import { FileMock } from '@ionic-native-mocks/file'
import { PlatformMock, SplashScreenMock, StatusBarMock } from '../../config/mocks'
import { WalletProvider } from '../providers/wallet/wallet.provider'
import { NotificationProvider } from '../providers/notification.provider'
import { TranslateLoader, TranslateModule } from '@ngx-translate/core'
import { TranslateHttpLoader } from '@ngx-translate/http-loader'
import { HttpClient } from '@angular/common/http'
import { FileStorageProvider } from '../providers/file-storage.provider'
import { DebugElement } from '@angular/core'

describe('MyApp Component', () => {
	let component: MyApp
	let fixture: ComponentFixture<MyApp>
	let debugElement: DebugElement

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [MyApp],
			imports: [
				IonicModule.forRoot(MyApp),
			  HttpClientTestingModule,
				TranslateModule.forRoot({
					loader: {
						provide: TranslateLoader,
						useFactory: (http: HttpClient) => new TranslateHttpLoader(http, './assets/i18n/', '.json'),
						deps: [HttpClient]
					}
				}),
			],
			providers: [
				WalletProvider,
				ToastController,
				NotificationProvider,
				FileStorageProvider,
				{ provide: StatusBar, useClass: StatusBarMock },
				{ provide: SplashScreen, useClass: SplashScreenMock },
				{ provide: Platform, useClass: PlatformMock },
				{ provide: File, useClass: FileMock }
			]
		})
	}))

	beforeEach(() => {
		fixture = TestBed.createComponent(MyApp)
		component = fixture.componentInstance
		debugElement = fixture.debugElement
	})

	it('should have rootPage property', () => {
		expect(component.rootPage).toBeUndefined()

	})

	it('should be created', () => {
		expect(component instanceof MyApp).toBe(true)
	})
})
