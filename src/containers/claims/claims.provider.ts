import { Injectable } from '@angular/core'
import { LoadingController } from 'ionic-angular'
import { NEO_HASH } from '../../shared/constants'
import { ApiProvider, AccountProvider, WalletProvider } from '../../providers'
import { PossessionsProvider } from '../possessions/possessions.provider'

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
		private possessionsProvider: PossessionsProvider
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
		           .then(res => {
			           if (res['result']) {
				           return this.postGAS(publicKey).then(this.apiProvider.broadcast)
			           } else {
			           	return Promise.reject('转账过程出现了问题')
			           }
		           })
	}

	postGAS (publicKey) {
		return this.apiProvider.post('gas', { publicKey }).toPromise()
	}

	doSendAsset () {
		return this.possessionsProvider
		           .getBalances()
		           .then(balances => {
			           const NEO = balances.find(bal => bal.hash === NEO_HASH)
			           const address = this._account.address
			           const data = {
				           dests: address,
				           amounts: NEO.amount,
				           assetId: NEO_HASH,
				           source: address
			           }
			           return this.postTransfer(data)
			                      .then(res => this.generateSignature(res['transaction']))
			                      .then(async res => await this.apiProvider.broadcast(res).toPromise())
		           })
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