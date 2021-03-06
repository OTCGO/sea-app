import { Injectable } from '@angular/core'
import { ApiProvider, AccountProvider } from '../../../providers'

import { wallet } from '../../../libs/neon'
import { getWif } from '../../../shared/utils'
const { generateSignature } = wallet

interface ISendOpts {
	dests: string
	amounts: number
	assetId: string,
	fee: string
}

@Injectable()
export class SendModalProvider {
	account = this.accountProvider.defaultAccount

	constructor(
		private apiProvider: ApiProvider,
		private accountProvider: AccountProvider
	) {

	}

	async decrypt(passphrase) {
		// try {

		// 	if (this.account._WIF) return wallet.getPrivateKeyFromWIF(this.account._WIF)
		// } catch (e) {
		// 	console.log(e)
		// }
		try {
			// const wif = wallet.decrypt(this.account.encrypted, passphrase)
			console.log('this.account.encrypted', this.account.encrypted)
			const wif: any = await getWif(this.account.encrypted, passphrase)

			console.log('decrypt:passphrase', passphrase)
			const pr = wallet.getPrivateKeyFromWIF(wif)
			console.log('decrypt:pr', pr)
			return Promise.resolve(pr)
		} catch (e) {
			console.log(e)
			return Promise.reject('密码错误')
		}
	}

	doSendAsset({ dests, amounts, assetId, fee }: ISendOpts, pr) {
		// console.log('doSendAsset', pr)
		return this.postTransfer({ dests, amounts, assetId, source: this.account.address, fee })
			.then(res => {
				// console.log('doSendAsset',res)
				if(res.result){
					return this.generateSignature(res['transaction'], pr)
				}

				throw new Error('ERROR.build_err')

			})

			.then(res => {
				return this.apiProvider.broadcast(res).toPromise()
		
			})

	}

	doSendAssetOnt({ dests, amounts, assetId }: ISendOpts, pr) {
		console.log('doSendAsset', pr)
		return this.postTransferOnt({ dests, amounts, assetId, source: this.account.address })
			.then(res => {
				if(res.result){
					return this.generateSignatureOnt(res['transaction'], pr, res['sigdata'])
				}

				throw new Error('ERROR.build_err')
				
			})
			.then(res => this.apiProvider.broadcastOnt(res).toPromise())
	}

	getNncAddress(domain) {
		return this.apiProvider.get(`resolve/${domain}`).toPromise()
	}

	private postTransferOnt(transferPostData) {
		return this.apiProvider.post('transfer/ont', transferPostData).toPromise()
	}

	private postTransfer(transferPostData) {
		return this.apiProvider.post('transfer', transferPostData).toPromise()
	}

	private generateSignature(transaction, pr) {

		const publicKey = wallet.getPublicKeyFromPrivateKey(pr, true)
		console.log('publicKey', publicKey)

		console.log('generateSignature', pr)
		const signature = generateSignature(transaction, pr)

		return {
			publicKey,
			signature,
			transaction
		}
	}


	private generateSignatureOnt(transaction, pr, sigdata) {

		// const signature = generateSignature(transaction, pr)
		// const publicKey = wallet.getPublicKeyFromPrivateKey(pr, true)
		const publicKey = wallet.getPublicKeyFromPrivateKey(pr, true)
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
