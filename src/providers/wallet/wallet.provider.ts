import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { File } from '@ionic-native/file'

import { OLD_WALLET_CHECK_LIST, NEW_WALLET_CHECK_LIST, OTCGO_WALLET_FILE_NAME } from './wallet.consts'

import { wallet } from '../../libs/neon'
import { decryptOldWallet, doSign, doVerify } from '../utils'

@Injectable()
export class WalletProvider {
	dataDirectory: string
	scrypt = { n: 16384, r: 8, p: 8, size: 64 }

	get wallet () {
		if (this._wallet)
			return this._wallet
	}

	set wallet (file) {
		if (this.isWallet(file)) {
			this._wallet = new wallet.Wallet(file)
		}
	}

	private _wallet

	constructor (
		public http: HttpClient,
		private file: File
	) {}

	initWallet () {
		console.log('wallet is init')

		this.wallet = {
			name: 'OTCGO-mobile-wallet',
			scrypt: this.scrypt,
			accounts: [],
			version: 'beta-0.2',
			extra: null
		}
	}

	addAccount (account) { if (this.wallet) this.wallet.addAccount(account) }

	hasAccount (): boolean { return !!this.wallet.accounts.length }

	getDefaultAccount () { if (this.hasAccount()) return this.wallet.defaultAccount }

	async readWallet () { return await this.file.readAsText(this.dataDirectory, OTCGO_WALLET_FILE_NAME) }

	upgradeAndAddToAccount (oldWalletJSON: object, passphrase: string): Promise<boolean | Error> {
		if (!this.isOldWallet(oldWalletJSON)) return Promise.reject(new Error('Is not an old wallet, Please check again!'))

		const { privateKeyEncrypted, publicKey } = oldWalletJSON as any

		let privateKey

		try {
			privateKey = decryptOldWallet(privateKeyEncrypted, passphrase)
			const result = this._verifyOldWallet(privateKey, publicKey)

			if (result) {
				const account = new wallet.Account(privateKey)
				account.encrypt(passphrase)
				this.wallet.addAccount(account)
				this.saveWalletFile()
				return Promise.resolve(true)
			} else {
				return Promise.reject(new Error('Incorrect Password!'))
			}

		} catch (e) {
			return Promise.reject(new Error(e))
		}
	}

	async saveWalletFile () {
		let fileExists = await this.checkWalletExists()
		if (!fileExists) {
			try {
				let saveFileAction = await this.file.writeFile(this.dataDirectory, OTCGO_WALLET_FILE_NAME, this.wallet.export())
				console.log('save file succeed', saveFileAction)
			} catch (err) {
				console.error('save file rejected')
				Object.keys(err).forEach(key => {
					console.log(key, err[key])
				})
			}
		} else {
			try {
				let saveFileAction = await this.file.writeExistingFile(this.dataDirectory, OTCGO_WALLET_FILE_NAME, this.wallet.export())
				console.log('save file succeed', saveFileAction)
			} catch (err) {
				console.log('save file rejected', err)
			}
		}
	}

	isWallet = (items) => NEW_WALLET_CHECK_LIST.every(i => items.hasOwnProperty(i))

	isOldWallet = (items): boolean => OLD_WALLET_CHECK_LIST.every(i => items.hasOwnProperty(i))

	async checkWalletExists () {
		try {
			return await this.file.checkFile(this.dataDirectory, OTCGO_WALLET_FILE_NAME)
		} catch (e) {
			return Promise.resolve(false)
		}
	}

	private _verifyOldWallet (prvkey, pubkey) {
		const msg = 'aaa'
		const sigval = doSign(prvkey, msg)
		return doVerify(pubkey, msg, sigval)
	}
}
