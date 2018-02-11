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

	getPrivateKey (passphrase) {
		this.defaultAccount.decrypt(passphrase)
		return this.defaultAccount.privateKey
	}

	getWIF (account) {

	}

	getAddress (account) {
		return account ? (new Account(account)).address : this.defaultAccount.address
	}

	getBalances (account) {
		if (account) {
			const acct = new Account(account)
			return
		}
	}
}