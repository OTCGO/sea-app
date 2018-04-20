import { Injectable } from '@angular/core'
import { ApiProvider, AccountProvider } from '../../../providers'

import { wallet } from '../../../libs/neon'

const { generateSignature } = wallet

interface ISendOpts {
	dests: string
	amounts: number
	assetId: string
}

@Injectable()
export class SendModalProvider {
	account = this.accountProvider.defaultAccount

	constructor (
		private apiProvider: ApiProvider,
		private accountProvider: AccountProvider
	) {}

	decrypt (passphrase) {
		try {
			if (this.account.WIF) return this.account.WIF
			const wif = wallet.decrypt(this.account.encrypted, passphrase)
			const pr = wallet.getPrivateKeyFromWIF(wif)
			return Promise.resolve(pr)
		} catch (e) {
			console.log('what the heck', e)
			return Promise.reject('密码错误')
		}
	}

	doSendAsset ({ dests, amounts, assetId }: ISendOpts, pr) {
		return this.postTransfer({ dests, amounts, assetId, source: this.account.address })
		           .then(res => this.generateSignature(res['transaction'], pr))
		           .then(res => this.apiProvider.broadcast(res).toPromise())
	}

	private postTransfer (transferPostData) {
		return this.apiProvider.post('transfer', transferPostData).toPromise()
	}

	private generateSignature (transaction, pr) {
		const publicKey = wallet.getPublicKeyFromPrivateKey(pr)
		const signature = generateSignature(transaction, pr)

		return {
			publicKey,
			signature,
			transaction
		}
	}
}
