import { async, ComponentFixture, TestBed, TestModuleMetadata } from '@angular/core/testing'
import { DebugElement } from '@angular/core'
import { LoginPage } from './login'
import { TranslateModule } from '@ngx-translate/core'
import { WalletProvider } from '../../providers/wallet/wallet.provider'
import { AlertController, IonicModule, NavController, NavParams } from 'ionic-angular'
import { AlertControllerMock } from 'ionic-mocks'
import { NavMock } from '../../../config/mocks'
import { FileStorageProvider } from '../../providers/file-storage.provider'
import { File } from '@ionic-native/file'
import { FileMock } from '@ionic-native-mocks/file'

class NavParamsMock {
	data = {}

	get () {

	}
}

const wrongWIF = 'APSXOIJA_)(*'
const WIF = 'Kzz3djNvv2dwUfM4mw7DnKoqe121zkirE6LNStGdNv2rf6pNVGdx'
const pwd = '12345678'
const wrongPwd = 'PASO IXNP!@)(*'

describe('Login page', () => {
	let de: DebugElement
	let comp: LoginPage
	let fixture: ComponentFixture<LoginPage>

	beforeEach(async(() => {
		TestBed.configureTestingModule(<TestModuleMetadata>{
			declarations: [LoginPage],
			imports: [
				TranslateModule.forRoot(),
				IonicModule.forRoot(LoginPage)
			],
			providers: [
				WalletProvider,
				FileStorageProvider,
				{ provide: File, useClass: FileMock },
				{ provide: NavController, useClass: NavMock },
				{ provide: NavParams, useClass: NavParamsMock },
				{ provide: AlertController, useFactory: () => AlertControllerMock.instance() }
			]
		})
	}))

	beforeEach(() => {
		fixture = TestBed.createComponent(LoginPage)
		comp = fixture.componentInstance
		de = fixture.debugElement
	})

	describe('With WIF key', () => {
		describe('With correct WIF', () => {
			it('With correct passphrase', () => {

			})

			it('With wrong passphrase', () => {
				comp.WIFKey = WIF
				comp.passphrase = wrongPwd
				comp.login()
				fixture.detectChanges()

			})
		})

		describe('With wrong WIF key', () => {
			it('With correct passphrase', () => {

			})

			it('With wrong passphrase', () => {
				comp.WIFKey = wrongWIF
				comp.passphrase = wrongPwd
				comp.login()
			})

		})
	})

	it('With NEP6 file', () => {

	})

	it('With old wallet file', () => {

	})

})
