import { async, TestBed } from '@angular/core/testing'
import { IonicModule, Platform } from 'ionic-angular'
import { StatusBar } from '@ionic-native/status-bar'
import { SplashScreen } from '@ionic-native/splash-screen'
import { HttpClientTestingModule } from '@angular/common/http/testing'

import { MyApp } from './app.component'
import { File } from '@ionic-native/file'
import { FileMock } from '@ionic-native-mocks/file'
import { PlatformMock, SplashScreenMock, StatusBarMock } from '../mocks'
import { WalletProvider } from '../providers/wallet/wallet.provider'
import { ApiProvider } from '../providers/api/api.provider'
import { PriceProvider } from '../providers/api/price.provider'

describe('MyApp Component', () => {
	let fixture
	let component

	beforeEach(async (() => {
		TestBed.configureTestingModule({
			declarations: [MyApp],
			imports: [
				IonicModule.forRoot(MyApp),
			  HttpClientTestingModule
			],
			providers: [
				ApiProvider,
				WalletProvider,
				PriceProvider,
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
	})

	it('should be created', () => {
		expect(component instanceof MyApp).toBe(true)
	})
})