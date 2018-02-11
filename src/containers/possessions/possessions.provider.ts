import { Injectable } from '@angular/core'
import { ApiProvider } from '../../providers/api'
import * as API_CONSTANTS from '../../providers/api/api.consts'
import { WalletProvider } from '../../providers/wallet/wallet.provider'

import 'rxjs/add/operator/map'
import 'rxjs/add/operator/publishLast'
import 'rxjs/add/operator/distinctUntilChanged'
import { ASSET_ENUM } from '../../shared/constants'

interface IBlances {
	hash: string
	name: string
	amount: number
}

@Injectable()
export class PossessionsProvider {
	account = this.walletProvider.getDefaultAccount()
	wallet = this.walletProvider.wallet

	constructor (private apiProvider: ApiProvider, private walletProvider: WalletProvider) {}

	getBalances(): Promise<any>
	getBalances(address: string): Promise<any>
	getBalances(...args): Promise<any>

	getBalances(...args): Promise<any> {
		const len = args.length
		if (len === 0) {
			const balances = this.apiProvider
			                     .get(API_CONSTANTS.BALANCES + '/' + this.account.address)
			                     .map(data => makeBalances(data))
			                     .distinctUntilChanged()
			                     .publishLast()
			balances.connect()
			return balances.toPromise()
		}

		if (len === 1) return // this.apiProvider.get(args[0]).toPromise()
		throw new Error('Arguments not accepted!')
	}

	getAccount () {
		return this.account
	}

	getAccounts () {
		return this.walletProvider.wallet.accounts
	}

	/**
	 * calculateBy('CNY') -> Balances.map(amount => amount.currentPrice('CNY')).reduce((acc, cur) => acc + cur, 0)
	 * calculateBy('GAS') -> Balances.map(amount => amount.currentPrice('CNY')).reduce((acc, cur) => acc + cur, 0) / GAS CurrentPrice
	 * calculateBy('GAS') -> Balances.map(amount => amount.currentPrice('CNY')).reduce((acc, cur) => acc + cur, 0) / NEO CurrentPrice
	 **/
	calculateBy () {

	}
}

function makeBalances(balancesJson) {
	return parseBalances(balancesJson['balances'])
}

/**
 * [{ amount: 1, asset: 'NEO', unspent: [] }, ...]
 * mapTo -> [{ amount: 1, asset: 'NEO', assetId: 'ASI120SAiwq9asunxa....'}, ...]
 **/
function parseBalances (balances) {
	return Object.keys(balances)
	             .map(
		             (hash) => ({
			             hash,
			             asset: ASSET_ENUM[hash],
			             amount: balances[hash]
		             })
	             )
}