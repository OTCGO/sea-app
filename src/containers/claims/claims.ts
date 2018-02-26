import { Component } from '@angular/core'
import { AlertController, IonicPage, LoadingController, Tab } from 'ionic-angular'


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
	  private alertCtrl: AlertController,
	  private loadingCtrl: LoadingController
	) {}

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
			let loading = this.loadingCtrl.create()

			let prompt = this.alertCtrl.create({
				title: '输入密码',
				message: '输入您的密码！',
				inputs: [{ name: 'passphrase', placeholder: '密码', type: 'password' }],
				buttons: [
					{ text: '取消' },
					{
						text: '确认',
						handler: ({ passphrase }) => {
							if (passphrase === '') return false
							loading.present().then(() => {
								try {
									this.account.decrypt(passphrase)
									loading.dismiss().then(() => {
										prompt.dismiss().then(() => {
											this.claimsProvider.doClaims()
										})
									})
								} catch (e) {
									loading.dismiss().then(() => {
										prompt.dismiss().then(() => {
											this.claimsProvider.doClaims()
										})
									})
								}
							})
						}
					}
				]
			})
			prompt.present()
		}
	}

	showPrompt (message) {
		const prompt = this.alertCtrl.create({ message })
		prompt.present()

	}

}
