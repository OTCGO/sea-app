import { Injectable } from '@angular/core'
import { ApiProvider, AccountProvider } from '../../../providers'

import { wallet } from '../../../libs/neon'

const { generateSignature, isAddress } = wallet
// const { is}

interface ISendOpts {
	dests: string
	amounts: number
	assetId: string
}

@Injectable()
export class SendModalProvider {
	private _account = this.accountProvider.defaultAccount

	constructor (
		private apiProvider: ApiProvider,
		private accountProvider: AccountProvider
	) {}

	decrypt (passphrase) {
		try {
			this.accountProvider.getPrivateKey(passphrase)
			return Promise.resolve(true)
		} catch (e) {

			return Promise.reject('密码错误')
		}
	}

	doSendAsset ({ dests, amounts, assetId }: ISendOpts) {
		return this.postTransfer({ dests, amounts, assetId, source: this._account.address })
		           .then(res => this.generateSignature(res['transaction']))
		           .then(async res => await this.apiProvider.broadcast(res).toPromise())
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

export { isAddress }