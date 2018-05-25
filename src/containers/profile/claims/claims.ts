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
	private claims: Observable<Claims>
	private btnLoading = false

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

	get btnDisabled () {
	  let state = true
	  if (this.claims)
	    this.claims.take(1).subscribe(claims => {
        if (claims && +claims.unavailable) state = false
      })
	  return state
  }

	async doClaim () {


		// wif login
		if (this.account._WIF) {
			try {
				this.btnLoading = true
				const result = await this.claimsProvider.doClaims(this.account._privateKey)

				this.btnLoading = false

				if (result) {
					this.showPrompt('提取成功！')
					return
				}

				this.showPrompt('提取失败!，请稍候再试')

			} catch (e) {
				this.btnLoading = false
				this.showPrompt('提取失败!，请稍候再试')
			}
			return
		}


		// file login
		const prompt = this.alertCtrl.create({
			title: '输入密码',
			message: '输入您的密码！',
			inputs: [{ name: 'passphrase', placeholder: '密码', type: 'password' }],
			buttons: [
				{ text: '取消' },
				{
					text: '确认',
					handler:  ({ passphrase }) => {
						if (!passphrase || passphrase === '' || passphrase.length < 4) return false


						this.btnLoading = true

            let pr
            try {
              pr = getPrivateKeyFromWIF(decrypt(this.account.encrypted, passphrase))
            } catch (e) {
						  this.showPrompt('密码错误！')
            }

						this.claimsProvider.doClaims(pr).then(result => {

							prompt.dismiss().catch(() => {})
							this.btnLoading = false

							if (result) {
								this.showPrompt('提取成功！请稍后查看余额')
								return
							}

							this.showPrompt('提取失败！请稍候再试')


						}).catch((e) => {
							this.showPrompt('提取失败！请稍候再试')
							console.log(e)

							prompt.dismiss().catch(() => {})
							this.btnLoading = false
						})
					}
				}
			]
		})
		prompt.present()
	}

	showPrompt (msg) {
		const message = msg.message || msg
		const alert = this.alertCtrl.create({ message })
		alert.present()

		setTimeout(() => {
			alert.dismiss().catch(() => {})
		}, 1000)
	}
}
