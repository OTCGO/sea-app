import { Injectable } from '@angular/core'
import { ApiProvider } from '../../providers'
import { WalletProvider } from '../../providers/wallet/wallet.provider'

@Injectable()
export class ClaimsProvider {
	account = this.walletProvider.getDefaultAccount()

	constructor (private apiProvider: ApiProvider, private walletProvider: WalletProvider) {

	}

	getClaims () {
		return this.apiProvider.get('claim/' + this.account.address).toPromise()
	}
}