import { Injectable } from '@angular/core'
import { LoadingController } from 'ionic-angular'
import { NEO_HASH } from '../../shared/constants'
import { ApiProvider, AccountProvider, WalletProvider } from '../../providers'


import { Store, select } from '@ngrx/store'
import { RootState } from '../../reducers/index'
import { Get } from '../../actions/balances.action'
import * as fromBalances from '../../reducers/balances.reducer'
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/fromPromise'

import { wallet } from '../../libs/neon'
const { generateSignature } = wallet

@Injectable()
export class ClaimsProvider {
	_account = this.walletProvider.getDefaultAccount()

	constructor (
		private apiProvider: ApiProvider,
		private walletProvider: WalletProvider,
		private loadingCtrl: LoadingController,
		private accountProvider: AccountProvider,
	  private store: Store<RootState>
	) {

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

	doClaims (publicKey = this._account.publicKey) {
		let loading = this.loadingCtrl.create()
		loading.present()

		return this.doSendAsset()
	}

	postGAS (publicKey) {
		return this.apiProvider.post('gas', { publicKey }).toPromise()
	}

	doSendAsset () {
		this.store.dispatch(new Get(this._account.address))
		return this.store.pipe(
			select(fromBalances.getBalances),
			map(balances => {
				const NEO = balances.find(bal => bal.hash === NEO_HASH)
				const address = this._account.address
				const data = {
					dests: address,
					amounts: NEO.amount,
					assetId: NEO_HASH,
					source: address
				}
				const promise = this.postTransfer(data)
				                    .then(res => this.generateSignature(res['transaction']))
				                    .then(async res => await this.apiProvider.broadcast(res).toPromise())
				                    .catch(err => console.error('from claims provider doSendAsset()', err))
				return Observable.fromPromise(promise)
			})
		)
	}

	private postTransfer (transferPostData) {
		return this.apiProvider.post('transfer', transferPostData).toPromise()
	}

	private generateSignature (transaction) {

		const publicKey = this.accountProvider.getPublicKey()
		const signature = generateSignature(transaction, this._account.privateKey)

		return {
			publicKey,
			signature,
			transaction
		}
	}
}