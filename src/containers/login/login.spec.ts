import { async, ComponentFixture, TestBed, TestModuleMetadata } from '@angular/core/testing'
import { DebugElement } from '@angular/core'
import { LoginPage } from './login'
import { TranslateModule } from '@ngx-translate/core'
import { WalletProvider } from '../../providers/wallet/wallet.provider'
import { AlertController, IonicModule, NavController, NavParams } from 'ionic-angular'
import { AlertControllerMock } from 'ionic-mocks'
import { NavMock } from '../../../config/mocks'
import { FileStorageProvider } from '../../providers/file-storage.provider'
import { File as IonFile } from '@ionic-native/file'
import { FileMock } from '@ionic-native-mocks/file'
import { nep5Wallet, oldWallet } from '../../shared/userWallet'
import { ReactiveFormsModule } from '@angular/forms'
import { By } from '@angular/platform-browser'


class NavParamsMock {
	data = {}
	get () {}
}

const walletFile: File = new File([new Blob([JSON.stringify(nep5Wallet)])], 'OTCGO-mobile-wallet.json')
const wrongWalletFile: File = new File([new Blob([`{  aosidnasodin: 'asdoiasndoias' }`])], 'OTCGO-mobile-wallet.json')
const oldWalletFile: File = new File([new Blob([JSON.stringify(oldWallet)])], 'tt.json')

const wrongWIF = 'APSXOIJA_)(*'
const WIF = 'Kzz3djNvv2dwUfM4mw7DnKoqe121zkirE6LNStGdNv2rf6pNVGdx'
const pwd = '12345678'
const wrongPwd = 'PASO IXNP!@)(*'

describe('Login page', () => {
	let comp: LoginPage
	let fixture: ComponentFixture<LoginPage>

	let walletProvider: WalletProvider
	let alertCtrl: AlertController


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
				ReactiveFormsModule,
				{ provide: IonFile, useClass: FileMock },
				{ provide: NavController, useClass: NavMock },
				{ provide: NavParams, useClass: NavParamsMock },
				{ provide: AlertController, useFactory: () => AlertControllerMock.instance() }
			]
		})
	}))

	beforeEach(() => {
		fixture = TestBed.createComponent(LoginPage)
		comp = fixture.componentInstance
		let de: DebugElement = fixture.debugElement

		walletProvider = de.injector.get(WalletProvider)
		alertCtrl = de.injector.get(AlertController)
	})

	describe('Login with WIF key', () => {
		it('Should create new NEP5 encrypted wallet with given passphrase', () => {
			fixture.detectChanges()
			let inputs = fixture.debugElement.queryAll(By.css('input'))
			let wifInput = inputs[0]
			wifInput.nativeElement.value = WIF
			wifInput.nativeElement.dispatchEvent(new Event('input'))

			expect(comp.loginForm.value['key']).toBe(WIF)

			let passphraseInput = inputs[2]
			passphraseInput.nativeElement.value = pwd
			passphraseInput.nativeElement.dispatchEvent(new Event('input'))

			expect(comp.loginForm.value['passphrase']).toBe(pwd)

			spyOn(comp, 'fileChange')
			console.log(comp)
			expect((<any>comp).file).toBeUndefined()
			comp.fileChange(walletFile)
			expect(comp.fileChange).toHaveBeenCalled()
			expect((<any>comp).file).toBeDefined()
			console.log(comp)
			console.log((<any>comp)._file)
			console.log(comp.loginForm)
			// comp.login(comp.loginForm)
			console.log(walletProvider.wallet)
		})

		it('Should should error message with wrong WIF key', () => {

		})
	})

	it('With NEP6 file', () => {

	})

	it('With old wallet file', () => {

	})

})
