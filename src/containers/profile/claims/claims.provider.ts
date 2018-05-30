import { Injectable } from '@angular/core'
import { Store } from '@ngrx/store'
import { LoadingController } from 'ionic-angular'
import 'rxjs/add/observable/fromPromise'
import 'rxjs/add/operator/toPromise'

import { wallet } from '../../../libs/neon'
import {
	AccountProvider,
	ApiProvider
} from '../../../providers'
import { NEO_HASH } from '../../../shared/constants'
import { Load } from '../../../store/actions/balances.action'
import { RootState } from '../../../store/reducers/index'
import { BalancesSelectors } from '../../../store/selectors'

const { getPublicKeyFromPrivateKey, generateSignature } = wallet

@Injectable()
export class ClaimsProvider {
	_account = this.accountProvider.defaultAccount
	balances


	constructor (
		private apiProvider: ApiProvider,
		private loadingCtrl: LoadingController,
		private accountProvider: AccountProvider,
		private store: Store<RootState>
	) {
		this.store.select(BalancesSelectors.getDefaultNonZeroEntities).subscribe(balances => this.balances = balances)
	}

	getClaims () {
		return this.apiProvider.get('claim/' + this._account.address).toPromise()
	}

	hasDecrypt () {
		try {
			if (this._account.publicKey)
				return true
		} catch (e) {
			return false
		}
	}

	/**
	 * Claims process
	 * 1. POST GAS, { publicKey } -> { result: boolean, error?: string, transaction?: string }
	 * 2. POST Broadcase {  publicKey, signature: generateSignature(transaction, privateKey), transaction }
	 * */
	async doClaims (pr: string): Promise<boolean> {
		this.store.dispatch(new Load())
		const publicKey = getPublicKeyFromPrivateKey(pr)

		await this.doSendAsset(pr, publicKey)

		const { transaction } = await this.postGAS(pr)
		console.log('transaction', transaction)

		const signature = await this.generateSignatureAndData(transaction, pr, publicKey)
		console.log(signature)

		const res = await this.apiProvider.broadcast(signature).toPromise()
		return Promise.resolve(res['result'])
	}

	postGAS (pr) {
		return this.apiProvider.post('gas', { publicKey: getPublicKeyFromPrivateKey(pr) }).toPromise()
							 .then(res => {
								 if (res.error) throw res.error
								 return res
							 })
	}

	doSendAsset (pr: string, publicKey) {
		const NEO = this.balances.find(bal => bal.hash === NEO_HASH)
		const address = this._account.address
		console.log('doSendAsset:NEO', NEO)
		if (!NEO || !NEO.amount ) {
			return
		}
		const data = {
			dests: address,
			amounts: NEO.amount.toString(),
			assetId: NEO_HASH,
			source: address
		}
		return this.apiProvider.post('transfer', data).toPromise()
							 .then(res => this.generateSignatureAndData(res['transaction'], pr, publicKey))
							 .then(async signature => await this.apiProvider.broadcast(signature).toPromise())
							 .catch(err => console.error('from claims provider doSendAsset()', err))
	}

	private generateSignatureAndData (transaction, pr, publicKey) {
		const signature = generateSignature(transaction, pr)

		return {
			publicKey,
			signature,
			transaction
		}
	}
}
