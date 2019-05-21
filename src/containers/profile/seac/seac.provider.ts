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
import { SEAS_HASH } from '../../../shared/constants'
import { Load } from '../../../store/actions/balances.action'
import { RootState } from '../../../store/reducers/index'
import { BalancesSelectors } from '../../../store/selectors'

const { getPublicKeyFromPrivateKey, generateSignature } = wallet

@Injectable()
export class SeacProvider {
	_account = this.accountProvider.defaultAccount
	balances


	constructor(
		private apiProvider: ApiProvider,
		private loadingCtrl: LoadingController,
		private accountProvider: AccountProvider,
		private store: Store<RootState>
	) {
		this.store.select(BalancesSelectors.getDefaultNonZeroEntities).subscribe(balances => this.balances = balances)
	}

	getClaims() {
		return this.apiProvider.getV2('claim/seac' + this._account.address).toPromise()
	}

	hasDecrypt() {
		try {
			if (this._account.publicKey)
				return true
		} catch (e) {
			return false
		}
	}


	// seac 可提取变余额
	async  tran(pr, publicKey) {
		// transfer
		const res = await this.doSendAsset(pr, publicKey)
		console.log('res', res)
		return res


	}

	/**
	 * Claims process
	 * 1. POST GAS, { publicKey } -> { result: boolean, error?: string, transaction?: string }
	 * 2. POST Broadcase {  publicKey, signature: generateSignature(transaction, privateKey), transaction }
	 * */
	async doClaims(data, pr: string): Promise<boolean> {
		console.log('doClaims', pr)
		try {


			this.store.dispatch(new Load())

			const publicKey = wallet.getPublicKeyFromPrivateKey(pr, true)


			const res = await this.tran(pr, publicKey)

			if (!res['result']) {
				return  Promise.resolve(false)
			}

			return Promise.resolve(true)
		

		} catch (error) {
			console.log('error', error)
			return  Promise.resolve(false)
		}
	}


	/*
	// 不可提取为0
	async doClaimsUnavailable (pr: string): Promise<boolean> {

		// const publicKey = getPublicKeyFromPrivateKey(pr)
		const { transaction } = await this.postGAS(pr)
		console.log('transaction', transaction)

		const signature = await this.generateSignatureAndData(transaction, pr, publicKey)
		console.log(signature)

		const res = await this.apiProvider.broadcast(signature).toPromise()
		return Promise.resolve(res['result'])
	}
	*/

	postGAS(pr) {
		return this.apiProvider.post('gas', { publicKey: getPublicKeyFromPrivateKey(pr) }).toPromise()
			.then(res => {
				if (res.error) throw res.error
				return res
			})
	}

	doSendAsset(pr: string, publicKey) {
		const SEAS = this.balances.find(bal => bal.hash === SEAS_HASH)
		const address = this._account.address
		console.log('doSendAsset:NEO', SEAS)
		if (!SEAS || !SEAS.amount) {
			return
		}
		const data = {
			dests: address,
			amounts: SEAS.amount.toString(),
			assetId: SEAS_HASH,
			source: address
		}
		return this.apiProvider.post('transfer', data).toPromise()
			.then(res => this.generateSignatureAndData(res['transaction'], pr, publicKey))
			.then(async signature => await this.apiProvider.broadcast(signature).toPromise())
			.catch(err => console.error('from claims provider doSendAsset()', err))
	}

	private generateSignatureAndData(transaction, pr, publicKey) {

		// const signature = generateSignature(transaction, pr)
		// const publicKey = wallet.getPublicKeyFromPrivateKey(pr, true)
		console.log('publicKey', publicKey)

		console.log('generateSignature', pr)
		const signature = generateSignature(transaction, pr)

		return {
			publicKey,
			signature,
			transaction
		}
	}
}
