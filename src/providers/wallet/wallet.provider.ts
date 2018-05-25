import { Injectable } from '@angular/core'
import { FileStorageProvider } from '../file-storage.provider'
import { wallet } from '../../libs/neon'
import { Account } from '../../shared/typings'
import { isOldWallet, decryptPrv, verifyKeyPair } from '../../shared/utils'
import { OTCGO_WALLET_FILE_NAME } from '../../shared/constants'
import { OldWalletFile } from '../../shared/models'
import { Observable } from 'rxjs'
import { of } from 'rxjs/observable/of'
import { _throw } from 'rxjs/observable/throw'


@Injectable()
export class WalletProvider {
	constructor (
		private fileStorageProvider: FileStorageProvider,
	) { }

	async checkWalletFile () {
		return await this.fileStorageProvider.checkFile(OTCGO_WALLET_FILE_NAME)
	}

	async readWalletFile () {
		return await this.fileStorageProvider.read(OTCGO_WALLET_FILE_NAME)
	}

	async saveWalletFile (walletFile) {
		const walletTextFile = JSON.stringify(walletFile)
		return await this.fileStorageProvider.save(OTCGO_WALLET_FILE_NAME, walletTextFile)
	}

	upgradeToNEP5Account (oldWalletJSON: OldWalletFile, passphrase: string, isDefault): Observable<Account> {
		if (!isOldWallet(oldWalletJSON)) {
			_throw('Is not an old wallet, Please check again!')
		}

		try {
      return this._upgradeToNEP5Account(oldWalletJSON, passphrase, isDefault)
		} catch (e) {
			// Because the error come from decryption, It looks like 'Malform format...'
			// So we just using 'Incorrect password' instead
			throw new Error('Incorrect password')
		}
	}

	private _upgradeToNEP5Account (oldWalletJSON, passphrase, isDefault = false): Observable<Account> {
		const { privateKeyEncrypted, publicKey } = <any>oldWalletJSON
		const privateKey = decryptPrv(privateKeyEncrypted, passphrase)
		const result = verifyKeyPair(privateKey, publicKey)

		if (result) {
			const account = new wallet.Account(privateKey)
			account.encrypt(passphrase)
      if (isDefault) account.isDefault = true
			return of(account)
		}
		_throw('Incorrect Password!')
	}

	/*createWalletAndDecrypt (walletFile, passphrase) {
		const nepWallet = new wallet.Wallet(walletFile)
		const index = nepWallet.accounts.indexOf(nepWallet.defaultAccount)
		if (nepWallet.decrypt(index, passphrase))
			return nepWallet
		else throw new Error('Password incorrect!')
	}*/
}
