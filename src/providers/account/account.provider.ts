import { Injectable } from '@angular/core'
import { wallet } from '../../libs/neon'
import { WalletProvider } from '../wallet/wallet.provider'

const { Account } = wallet

@Injectable()
export class AccountProvider {
	get accounts () {
	  console.log(JSON.stringify(this.walletProvider.wallet, null, 4))
	  return this.walletProvider.wallet.accounts
  }

	get defaultAccount () {
		return this.accounts.find(account => account.isDefault)
	}

	constructor (private walletProvider: WalletProvider) {}

	getPublicKey (encoded: boolean) {
		return this.defaultAccount.getPublicKey(encoded)
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
