import { Component, OnInit } from '@angular/core'
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
import { TranslateService } from '@ngx-translate/core'
import { getWif } from '../../../shared/utils'
import { MessageService } from '../../../shared/services'
import { Subscription } from 'rxjs/Subscription'



@IonicPage({
	name: 'Claims',
	segment: 'claims'
})
@Component({
	selector: 'page-claims',
	templateUrl: 'claims.html'
})
export class ClaimsPage implements OnInit {
	account = this.accountProvider.defaultAccount
	private claims: Observable<Claims>
	private btnLoading = false
	private alert
	subscription: Subscription

	constructor(
		private ts: TranslateService,
		private claimsProvider: ClaimsProvider,
		private accountProvider: AccountProvider,
		private alertCtrl: AlertController,
		private store: Store<RootState>,
		private msgService: MessageService,
		private loadingCtrl: LoadingController
	) {


		this.subscription = this.msgService.getMessage().subscribe(data => {
			// console.log('')
			console.log('this.subscription', data)
			if (data.text === 'claims-gas') {
				console.log('this.subscription.text', data.text)
				if (this.alert) {
					this.alert.dismiss().catch()
				}

				this.msgService.msg = undefined
				// this.viewCtrl.dismiss()
			}
		})

	}

	ngOnInit() {
		if (this.alert) {
			this.alert.dismiss().catch()
		}

		this.store.dispatch(new ClaimsActions.Load())
		this.claims = this.store.select(ClaimsSelectors.getEntities)
	}

	// ionViewDidLoad() {
	// 	this.store.dispatch(new ClaimsActions.Load())
	// 	this.claims = this.store.select(ClaimsSelectors.getEntities)
	// }

	async doClaim() {


		/*
		// wif login
		if (this.account._WIF) {
			try {
				this.btnLoading = true
				const result = await this.claimsProvider.doClaims(this.account._privateKey)

				this.btnLoading = false

				if (result) {

					this.ts.get('CLAIMS.success').take(1).subscribe(data => {
						this.showPrompt(data)
					})

					return
				}

				this.ts.get('CLAIMS.fail').take(1).subscribe(data => {
					this.showPrompt(data)
				})


			} catch (e) {
				this.btnLoading = false
				this.ts.get('CLAIMS.fail').take(1).subscribe(data => {
					this.showPrompt(data)
				})
			}
			return
		}

		*/

		this.msgService.msg = 'claims-gas'


		let title
		// let message
		// let placeholder
		let btnCancle
		let btnConfirm

		let successText
		let failText

		this.ts.get('LOGIN.password').subscribe(data => {
			title = data
			// message = data
			// placeholder = data
		})

		this.ts.get('PROFILE.CONTACTS.remove_disagree').subscribe(data => {
			btnCancle = data
		})
		this.ts.get('PROFILE.CONTACTS.remove_agree').subscribe(data => {
			btnConfirm = data
		})

		this.ts.get('PROFILE.CLAIMS.success').subscribe(data => {
			successText = data
		})


		this.ts.get('PROFILE.CLAIMS.fail').subscribe(data => {
			failText = data
		})


		// console.log('successText', successText)
		// console.log('failText', failText)



		let c
		this.claims.subscribe(data => {
			c = data
		})




		const self = this
		this.alert = this.alertCtrl.create({
			title: title,
			// message: title,
			inputs: [{ name: 'passphrase', placeholder: title, type: 'password' }],
			buttons: [
				{ text: btnCancle },
				{
					text: btnConfirm,
					handler: ({ passphrase }) => {
						try {
							if (!passphrase || passphrase === '' || passphrase.length < 8 || passphrase.length > 20) return false

							const loading = this.loadingCtrl.create()
							loading.present().then(() => {
								this.btnLoading = true

								getWif(this.account.encrypted, passphrase).then((wif: any) => {
									// const pr = getPrivateKeyFromWIF(decrypt(this.account.encrypted, passphrase))
									const pr = getPrivateKeyFromWIF(wif)
									console.log('getWif', pr)
									this.claimsProvider.doClaims(c, pr).then(result => {

										self.alert.dismiss().catch(() => { })
										this.btnLoading = false

										loading.dismiss().catch(() => { }).catch(() => { })
										if (result) {
											this.showPrompt(successText)
											return
										}

										this.showPrompt(failText)
									})

								}).catch((e) => {
									this.showPrompt(failText)
									console.log(e)

									self.alert.dismiss().catch(() => { })
									loading.dismiss().catch(() => { }).catch(() => { })
									this.btnLoading = false
								})



							}).catch((e) => {
								this.showPrompt(failText)
								console.log(e)

								self.alert.dismiss().catch(() => { })
								loading.dismiss().catch(() => { }).catch(() => { })
								this.btnLoading = false
							})

						} catch (error) {
							this.showPrompt(failText)
							// prompt.dismiss().catch(() => {})
							this.btnLoading = false
						}
					}
				}
			]
		})
		self.alert.present()




	}

	showPrompt(msg) {
		const message = msg.message || msg
		const alert = this.alertCtrl.create({ message })
		alert.present()

		setTimeout(() => {
			alert.dismiss().catch(() => { })
		}, 1000)
	}
}
