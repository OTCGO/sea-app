import { Component } from '@angular/core'
import { AlertController, IonicPage, LoadingController } from 'ionic-angular'
import { AccountProvider } from '../../../providers'
import { ClaimsProvider } from './claims.provider'
import { wallet } from '../../../libs/neon'
const { decrypt } = wallet

interface ClaimsRes {
	available: string
	unavailable: string
	claims: ClaimsResC[]
}
// TODO: I don't know what it is, think's like a claims history object
type ClaimsResC = [string, string]


@IonicPage({
	name: 'Claims',
	segment: 'claims'
})
@Component({
	selector: 'page-claims',
	templateUrl: 'claims.html'
})
export class ClaimsPage {
	account = this.accountProvider.defaultAccount
	availableGas

	constructor (
		private claimsProvider: ClaimsProvider,
		private accountProvider: AccountProvider,
	  private alertCtrl: AlertController,
	  private loadingCtrl: LoadingController
	) {}

	ionViewDidLoad () {
		this.getData()
	}

	getData () {
		this.claimsProvider.getClaims()
		    .then((res: ClaimsRes) => {
			    this.availableGas = (Number(res.available) + Number(res.unavailable)).toFixed(8)
		    })
	}

	doClaim () {
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
							loading.present().then(async () => {
								try {
									const pr = decrypt(this.account.encrypted, passphrase)
									await loading.dismiss()
									await prompt.dismiss()
									await this.claimsProvider.doClaims(pr)
								} catch (e) {
									await loading.dismiss()
									await prompt.dismiss()
									this.showPrompt(e.message || e)
									console.log(e)
								}
							})
						}
					}
				]
			})
			prompt.present()
	}

	showPrompt (message) {
		const prompt = this.alertCtrl.create({ message })
		prompt.present()
	}
}
