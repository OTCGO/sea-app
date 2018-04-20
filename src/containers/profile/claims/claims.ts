import { Component } from '@angular/core'
import { Store } from '@ngrx/store'
import { Claims } from '@shared/models'

import { AlertController, IonicPage, LoadingController } from 'ionic-angular'
import { AccountProvider } from '../../../providers'
import { ClaimsProvider } from './claims.provider'
import { RootState } from '../../../store/reducers'
import { ClaimsActions } from '../../../store/actions'
import { ClaimsSelectors } from '../../../store/selectors'
import { wallet } from '../../../libs/neon'
const { decrypt, getPrivateKeyFromWIF } = wallet


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
	  private store: Store<RootState>,
	  private loadingCtrl: LoadingController
	) {}

	ionViewDidLoad () {
		this.store.dispatch(new ClaimsActions.Load())
		this.store.select(ClaimsSelectors.getEntities).subscribe(
			(claims: Claims) => {
				if (claims)
					this.availableGas = (Number(claims.available) + Number(claims.unavailable)).toFixed(8)
			}
		)
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
							if (passphrase === '' || passphrase.length < 4) return false
							loading.present().then(async () => {
								try {
									const pr = getPrivateKeyFromWIF(decrypt(this.account.encrypted, passphrase))
									await loading.dismiss()
									await prompt.dismiss()
									const result = await this.claimsProvider.doClaims(pr)
									result && this.showPrompt('提取成功！')
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

	showPrompt (msg) {
		const message = msg.message || msg
		this.alertCtrl.create({ message }).present()
	}
}
