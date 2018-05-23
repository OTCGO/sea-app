import { Injectable } from '@angular/core'
import { Store } from '@ngrx/store'
import { wallet } from '../../libs/neon'
import { WalletProvider } from '../wallet/wallet.provider'
import { fromWallet } from '../../store/reducers'
import { WalletSelectors } from '../../store/selectors'

const { Account } = wallet

@Injectable()
export class AccountProvider {
	accounts

	get defaultAccount () {
		return this.accounts.find(account => account.isDefault)
	}

	constructor (private walletProvider: WalletProvider, private store: Store<fromWallet.State>) {
		this.store.select(WalletSelectors.getAccounts).subscribe(accounts => this.accounts = accounts)
	}

	getPublicKey (encoded: boolean) {
		return this.defaultAccount.getPublicKey(encoded)
	}

	decrypt (passphrase) {

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
