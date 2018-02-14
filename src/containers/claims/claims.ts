import { Component } from '@angular/core'
import { AlertController, IonicPage } from 'ionic-angular'

import { ClaimsProvider } from './claims.provider'
import { WalletProvider } from '../../providers/wallet/wallet.provider'


@IonicPage({
	name: 'Claims',
	segment: 'claims'
})
@Component({
	selector: 'page-claims',
	templateUrl: 'claims.html'
})
export class ClaimsPage {
	account = this.walletProvider.getDefaultAccount()
	availableGas

	constructor (
		private claimsProvider: ClaimsProvider,
		private walletProvider: WalletProvider,
	  private alertCtrl: AlertController
	) {

	}

	ionViewDidLoad () {
		this.getData()
	}

	getData () {
		this.claimsProvider.getClaims()
		    .then(res => {
			    this.availableGas = res['available']
		    })
	}

	doClaim () {
		if (this.claimsProvider.hasDecrypt()) {
			this.claimsProvider.doClaims()
		} else {
			let prompt = this.showPrompt({
				cssClass: 'mw__exports-actions--box',
				title: '输入密码',
				message: '登陆之后，只需要输入密码一次，系统就会帮你记录哦！',
				inputs: [{ name: 'passphrase', placeholder: '密码', type: 'password' }],
				buttons: [
					{ text: '取消' },
					{
						text: '确认',
						handler: ({ passphrase }) => {
							if (passphrase === '') return false
							this.account.decrypt(passphrase)

						}
					}
				]
			})
			this.claimsProvider.doClaims()
		}
	}

	showPrompt (config) {
		const prompt = this.alertCtrl.create(config)
		prompt.present()
		return prompt
	}

	parsePassphrase (encryptedKey, passphrase, commonLoading, type) {
		if (!passphrase) return false
		commonLoading.present().then(
			_ => {
				try {
					wallet.decryptWIF(encryptedKey, passphrase)
					      .then(wif => {
						      commonLoading.dismiss()
						      let account = new wallet.Account(wif)
						      if (type === 'privateKey') {
							      return this.showKey({ title: '私钥', message: account[type] })
						      }
						      return this.showKey({ title: 'WIF', message: account[type] })
					      })
					      .catch(_ => {
						      this.handleError(commonLoading)
					      })
					return true
				} catch (error) {
					this.handleError(commonLoading)
					return true
				}
			}
		)
	}
}
