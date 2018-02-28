import { Injectable } from '@angular/core'
import { FileStorageProvider } from '../file-storage.provider'

import { wallet } from '../../libs/neon'
import { decryptOldWallet, verifyOldWallet } from '../utils'
import {
	DEFAULT_EMPTY_WALLET,
	OLD_WALLET_CHECK_LIST,
	NEW_WALLET_CHECK_LIST,
	OTCGO_WALLET_FILE_NAME
} from './wallet.consts'
import { Wallet } from '../../libs/neon/src/wallet/index'

const { Wallet, Account } = wallet

@Injectable()
export class WalletProvider {
	get wallet () { return this._wallet }
	set wallet (file: any) {
		if (file instanceof Wallet) {
			this._wallet = file
		}
		if (this.isWallet(file)) {
			this._wallet = new Wallet(file)
		}
	}
	private _wallet: Wallet

	constructor (
	  private fileStorageProvider: FileStorageProvider
	) { }
	
	async initWallet () {
		try {
			await this.fileStorageProvider.checkFile(OTCGO_WALLET_FILE_NAME)
			this.wallet = await this.fileStorageProvider.read(OTCGO_WALLET_FILE_NAME)
		} catch (err) {
			this.wallet = DEFAULT_EMPTY_WALLET
		}
	}

	addAccount (account) { if (this.wallet) this.wallet.addAccount(account) }

	hasAccounts (): boolean { return !!this.wallet.accounts.length }

	getDefaultAccount () { if (this.hasAccounts()) return this.wallet.defaultAccount }

	async upgradeAndAddToAccount (oldWalletJSON: object, passphrase: string): Promise<boolean | Error> {
		if (!this.isOldWallet(oldWalletJSON))
			return Promise.reject(new Error('Is not an old wallet, Please check again!'))

		let account
		try {
			account = await this._upgradeWallet(oldWalletJSON, passphrase)
			this.wallet.addAccount(account)
			this.saveWallet()
		} catch (e) {
			return Promise.reject(new Error('Incorrect password!'))
		}
	}

	saveWallet () {
		this.fileStorageProvider.save(OTCGO_WALLET_FILE_NAME, this.wallet.export())
	}

	private _upgradeWallet (oldWalletJSON, passphrase) {
		const { privateKeyEncrypted, publicKey } = <any>oldWalletJSON
		let privateKey = decryptOldWallet(privateKeyEncrypted, passphrase)
		const result = verifyOldWallet(privateKey, publicKey)

		if (result) {
			const account = new Account(privateKey)
			account.encrypt(passphrase)
			return Promise.resolve(account)
		}
	}

	isWallet = (items) => NEW_WALLET_CHECK_LIST.every(i => items.hasOwnProperty(i))

	isOldWallet = (items): boolean => OLD_WALLET_CHECK_LIST.every(i => items.hasOwnProperty(i))
}
