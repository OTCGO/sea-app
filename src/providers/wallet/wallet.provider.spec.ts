import {
	inject,
	TestBed,
	async
} from '@angular/core/testing'
import { File } from '@ionic-native/file'
import { FileMock } from '@ionic-native-mocks/file'

import { Platform } from 'ionic-angular'

import { WalletProvider } from './wallet.provider'
import { FileStorageProvider } from '../file-storage.provider'

describe('Test wallet.provider', function () {
	const oldFormatAccount = {
		'address': 'AHZDq78w1ERcDYVBWjU5owWcbFZKLvhg7X',
		'publicKey': '0483cdbc3f4d2213043c19d6bd041c08fbe0a3bacd43ef695500a1b33c609a9e8a180eee2ada65ddb65154863c57bac9ab1b89a61593235991d5fb6f627c0cadbd',
		'publicKeyCompressed': '0383cdbc3f4d2213043c19d6bd041c08fbe0a3bacd43ef695500a1b33c609a9e8a',
		'privateKeyEncrypted': 'U2FsdGVkX1/TSwg9yTR+kDT8QKgC5yAQpc64KI0XyiCz97ozFLJK8YNJxvahqHr4lmBLYxZkM4E9tpIVHsblJjcjio19hb8L+uiYM4WXUAFQtpXIDDvwIP+TutTKQHOH'
	}
	const pwd = '12345678'
	const wrongPwd = 'wrong pas a!)((~*'

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			providers: [
				WalletProvider,
				FileStorageProvider,
				Platform,
				{ provide: File, useClass: FileMock },
			]
		}).compileComponents()
	}))

	it('Login with wif', inject([WalletProvider], (wp: WalletProvider) => {
		expect(true).toBeTruthy()
	}))

	it('test have an account',
		inject([WalletProvider], async (wp: WalletProvider) => {
			expect(wp.hasAccounts()).toBeFalsy()

			await wp.setWallet()
			wp.saveWallet()

			wp.checkWalletFile()
				.then(file => {
					console.log('checkWalletFile.then(file => ', file)
				})
		})
	)

	describe('Test old format account', () => {
		it('With right passphrase',
			inject([WalletProvider], async (wp: WalletProvider) => {
				await wp.setWallet()
				wp.upgradeAndAddToAccount(oldFormatAccount, pwd).then(bool => {
					expect(bool).toBeTruthy()
				})
			})
		)

		it('With wrong passphrase',
			inject([WalletProvider], async (wp: WalletProvider) => {
				await wp.setWallet()
				wp.upgradeAndAddToAccount(oldFormatAccount, wrongPwd)
					.catch(error => {
						expect(error).toBeDefined('Incorrect password!')
					})
			})
		)


	})


})
