import { Injectable } from '@angular/core'
import { wallet } from '../../libs/neon'
import { WalletProvider } from '../wallet/wallet.provider'

const { Account } = wallet

// Abstract Account level from wallet
@Injectable()
export class AccountProvider {
	accounts = this.walletProvider.wallet.accounts

	get defaultAccount () {
		return this.accounts.find(account => account.isDefault)
	}

	constructor (private walletProvider: WalletProvider) {}

	getPublicKey () {
		return this.defaultAccount.publicKey
	}

	decrypt (passphrase) {
		this.defaultAccount.decrypt(passphrase)
	}

	getPrivateKey () {
		return this.defaultAccount.privateKey
	}

	getWIF (account) {

	}

	getAddress (account) {
		return account ? (new Account(account)).address : this.defaultAccount.address
	}
}