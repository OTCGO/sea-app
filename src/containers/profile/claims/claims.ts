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
import { Observable } from 'rxjs/Observable'

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
	private claims: Observable<Claims>; 

	constructor (
		private claimsProvider: ClaimsProvider,
		private accountProvider: AccountProvider,
	  private alertCtrl: AlertController,
	  private store: Store<RootState>,
	  private loadingCtrl: LoadingController
	) {}

	ionViewDidLoad () {
		this.store.dispatch(new ClaimsActions.Load())
		this.claims = this.store.select(ClaimsSelectors.getEntities)
	}

	async doClaim () {
		const loading = this.loadingCtrl.create()
		loading.present();

		
		// wif login
		if(this.account._WIF){
			try {
				const result = await this.claimsProvider.doClaims(this.account._privateKey)
				result && this.showPrompt('提取成功！')

				await loading.dismiss()

			} catch (e) {
				this.showPrompt(e.message || e)
				await loading.dismiss()
				console.log(e)
			}
			return
		}
		
		const prompt = this.alertCtrl.create({
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
								const result = await this.claimsProvider.doClaims(pr)
								result && this.showPrompt('提取成功！')

								await loading.dismiss()
								await prompt.dismiss()
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
