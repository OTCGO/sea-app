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
import { ONT_HASH } from '../../../shared/constants'
import { Load } from '../../../store/actions/balances.action'
import { RootState } from '../../../store/reducers/index'
import { BalancesSelectors } from '../../../store/selectors'
import { AnyFn } from '@ngrx/store/src/selector'

const { getPublicKeyFromPrivateKey, generateSignature } = wallet

@Injectable()
export class OngProvider {
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
		return this.apiProvider.get('claim/ong' + this._account.address).toPromise()
	}

	hasDecrypt() {
		try {
			if (this._account.publicKey)
				return true
		} catch (e) {
			return false
		}
	}



	// 可提取变余额
	async  pick(pr, publicKey) {
		const { sigdata, transaction } = await this.postOnt(pr)
		console.log('sigdata', sigdata)
		const signature = await this.generateSignatureAndData(transaction, pr, publicKey, sigdata)
		// console.log(signature)
		const res = await this.apiProvider.broadcastOnt(signature).toPromise()
		console.log('pick', res)
		return res
		// return Promise.resolve(res['result']).catch()
		// if (res['result']) {
		// 	return Promise.resolve(true)
		// }
		// return  Promise.resolve(false)
	}

	// 不可提取 到 可提取
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
	 *
	 * 1. 如果 ong < 0.01 提取按钮不可用
	 * 2. 如果 ong >= 0.02 正常提取
	 * 3. 如果 0.1<= ong < 0.2
	 * 		3,1 如果有可提取   就提取可提取部分
	 * 		3.2 如果无可提取   就提取不可提取部分
	 *
	 *
	 * */
	async doClaims(data, pr: string, ongBalance): Promise<boolean> {
		console.log('doClaims', pr)
		try {


			this.store.dispatch(new Load())
			// 	const publicKey = getPublicKeyFromPrivateKey(pr)
			const publicKey = wallet.getPublicKeyFromPrivateKey(pr, true)



			if (0.01 <= ongBalance && ongBalance < 0.02) {


				// 可提取为
				if (data.available > 0 ) {

					const res = await this.pick(pr, publicKey)
					// return Promise.resolve(true)
					if (res['result']) {
						return Promise.resolve(true)
					}
					return Promise.resolve(false)





				} else {

					// 不可提取为0   没有ont 不转账
					if (data.unavailable === '0') {
						return Promise.resolve(true)
					} else {
						const res = await this.tran(pr, publicKey)

						if (res['result']) {
							return Promise.resolve(true)
						}
						return Promise.resolve(false)
					}

				}



			}




			// if (ongBalance >= 0.02) {


			// }

			const res2 = await this.tran(pr, publicKey)
			if (!res2['result']) {
				return Promise.resolve(false)
			}

			const res1 = await this.pick(pr, publicKey)
			if (!res1['result']) {
				return Promise.resolve(false)
			}

			return Promise.resolve(true)



		} catch (error) {
			console.log('error', error)
			return Promise.resolve(false)
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

	postOnt(pr) {
		return this.apiProvider.post('ong', { publicKey: getPublicKeyFromPrivateKey(pr) }).toPromise()
			.then(res => {
				if (res.error) throw res.error
				return res
			})
	}

	doSendAsset(pr: string, publicKey) {
		const ONT = this.balances.find(bal => bal.hash === ONT_HASH)
		const address = this._account.address
		console.log('doSendAsset:ong', ONT)
		if (!ONT || !ONT.amount) {
			return
		}
		const data = {
			dests: address,
			amounts: ONT.amount.toString(),
			assetId: ONT_HASH,
			source: address
		}
		return this.apiProvider.post('transfer/ont', data).toPromise()
			.then(res => this.generateSignatureAndData(res['transaction'], pr, publicKey, res['sigdata']))
			.then(async signature => await this.apiProvider.broadcastOnt(signature).toPromise())
			.catch(err => console.error('from claims provider doSendAsset()', err))
	}

	private generateSignatureAndData(transaction, pr, publicKey, sigdata) {

		// const signature = generateSignature(transaction, pr)
		// const publicKey = wallet.getPublicKeyFromPrivateKey(pr, true)
		console.log('publicKey', publicKey)

		console.log('generateSignature', pr)
		const signature = generateSignature(sigdata, pr)

		return {
			publicKey,
			signature,
			transaction
		}
	}


}
