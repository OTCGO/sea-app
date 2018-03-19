import { Injectable } from '@angular/core'
import { FileStorageProvider } from '../file-storage.provider'
import { wallet } from '../../libs/neon'
import { Account } from '../../libs/neon/src/wallet'
import { isOldWallet, decryptPrv, verifyKeyPair } from '../../shared/utils'
import { OTCGO_WALLET_FILE_NAME } from '../../shared/constants'
import { OldWalletFile } from '../../shared/models'


@Injectable()
export class WalletProvider {
	constructor (
		private fileStorageProvider: FileStorageProvider
	) { }

	async checkWalletFile () {
		return await this.fileStorageProvider.checkFile(OTCGO_WALLET_FILE_NAME)
	}

	async readWalletFile () {
		return await this.fileStorageProvider.read(OTCGO_WALLET_FILE_NAME)
	}

	async saveWalletFile (wallet) {
		const walletTextFile = JSON.stringify(wallet)
		return await this.fileStorageProvider.save(OTCGO_WALLET_FILE_NAME, walletTextFile)
	}

	upgradeToNEP5Account (oldWalletJSON: OldWalletFile, passphrase: string): Account {
		if (!isOldWallet(oldWalletJSON)) {
			throw new Error('Is not an old wallet, Please check again!')
		}

		try {
			return this._upgradeToNEP5Account(oldWalletJSON, passphrase)
		} catch (e) {
			throw new Error(e)
		}
	}

	private _upgradeToNEP5Account (oldWalletJSON, passphrase): Account {
		const { privateKeyEncrypted, publicKey } = <any>oldWalletJSON
		let privateKey = decryptPrv(privateKeyEncrypted, passphrase)
		const result = verifyKeyPair(privateKey, publicKey)

		if (result) {
			const account = new wallet.Account(privateKey)
			account.encrypt(passphrase)
			return account
		}
		throw new Error('Incorrect Password!')
	}

	/*createWalletAndDecrypt (walletFile, passphrase) {
		const nepWallet = new wallet.Wallet(walletFile)
		const index = nepWallet.accounts.indexOf(nepWallet.defaultAccount)
		if (nepWallet.decrypt(index, passphrase))
			return nepWallet
		else throw new Error('Password incorrect!')
	}*/
}
