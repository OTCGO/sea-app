import { Injectable } from '@angular/core'
import { FileStorageProvider } from '../file-storage.provider'

import { wallet } from '../../libs/neon'
import { decryptPrv, verifyKeyPair } from '../utils'
import {
	DEFAULT_EMPTY_WALLET,
	OLD_WALLET_CHECK_LIST,
	NEW_WALLET_CHECK_LIST,
	OTCGO_WALLET_FILE_NAME
} from './wallet.consts'

@Injectable()
export class WalletProvider {
	get wallet () { return this._wallet }
	set wallet (file: any) {
		if (this.isWallet(file)) {
			this._wallet = new wallet.Wallet(file)
		}
	}
	private _wallet

	constructor (
	  private fileStorageProvider: FileStorageProvider
	) {
	}

	async setWallet (walletFile = DEFAULT_EMPTY_WALLET) {
		this.wallet = walletFile
	}

	async checkWalletFile () {
		return await this.fileStorageProvider.checkFile(OTCGO_WALLET_FILE_NAME)
	}

	readWalletFile () {
		return this.fileStorageProvider.read(OTCGO_WALLET_FILE_NAME)
	}

	addAccount (account) { if (this.wallet) this.wallet.addAccount(account) }

	hasAccounts (): boolean {
	  console.log('checking has Accounts', this.wallet, '')
	  return !!this.wallet && !!this.wallet.accounts.length
	}

	getDefaultAccount () { if (this.hasAccounts()) return this.wallet.defaultAccount }

	async upgradeAndAddToAccount (oldWalletJSON: object, passphrase: string): Promise<boolean | Error> {
		if (!this.isOldWallet(oldWalletJSON))
			return await Promise.reject(new Error('Is not an old wallet, Please check again!'))

		let account
		try {
			account = await this._upgradeWallet(oldWalletJSON, passphrase)
			account.isDefault = true
			this.wallet.addAccount(account)
			this.saveWallet()
			return await Promise.resolve(true)
		} catch (e) {
			return await Promise.reject(new Error('Incorrect password!'))
		}
	}

	async saveWallet () {
		const walletTextFile = JSON.stringify(this.wallet.export())
		return await this.fileStorageProvider.save(OTCGO_WALLET_FILE_NAME, walletTextFile)
	}

	private _upgradeWallet (oldWalletJSON, passphrase) {
		const { privateKeyEncrypted, publicKey } = <any>oldWalletJSON
		let privateKey = decryptPrv(privateKeyEncrypted, passphrase)
		const result = verifyKeyPair(privateKey, publicKey)

		if (result) {
			const account = new wallet.Account(privateKey)
			account.encrypt(passphrase)
			return Promise.resolve(account)
		}
	}

	isWallet = (items) => NEW_WALLET_CHECK_LIST.every(i => items.hasOwnProperty(i))

	isOldWallet = (items): boolean => OLD_WALLET_CHECK_LIST.every(i => items.hasOwnProperty(i))
}
