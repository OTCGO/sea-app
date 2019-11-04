import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { Claims } from '@shared/models'

import { AlertController, IonicPage, LoadingController } from 'ionic-angular'
import { AccountProvider } from '../../../providers'
import { OngProvider } from './ong.provider'
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
import { BalancesActions } from '../../../store/actions'
import { BalancesSelectors } from '../../../store/selectors'

@IonicPage({
	name: 'Ong',
	segment: 'ong'
})
@Component({
	selector: 'page-ong',
	templateUrl: 'ong.html'
})
export class OngPage implements OnInit {
	// account = this.accountProvider.defaultAccount
	private claims: Observable<Claims>
	private btnLoading = false
	private alert
	subscription: Subscription
	private symbol = 'ontology-ONG'
	private btnDisable = true
	private ongBalance

	constructor(
		private ts: TranslateService,
		private ongProvider: OngProvider,
		private accountProvider: AccountProvider,
		private alertCtrl: AlertController,
		private store: Store<RootState>,
		private msgService: MessageService,
		private loadingCtrl: LoadingController
	) {


		this.subscription = this.msgService.getMessage().subscribe(data => {
			// console.log('')
			console.log('this.subscription', data)
			if (data.text === 'claims-ong') {
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

		this.store.dispatch(new ClaimsActions.LoadONG())
		this.claims = this.store.select(ClaimsSelectors.getEntities)


		this.store.dispatch(new BalancesActions.Load())

		this.store.dispatch(new BalancesActions.Select(this.symbol))
		this.store.select(BalancesSelectors.getSelectedBalance).subscribe(balance => {
			console.log('ont:ngOnInit', balance)
			const result = parseFloat(balance.amount)

			this.ongBalance = result


			if (result < 0.01) {
				this.btnDisable = true
			}

			if (result >= 0.02) {
				this.btnDisable = false

			}
			if (0.01 <= result && result < 0.02) {
				this.btnDisable = false
			}

			console.log('ont:ngOnInit', this.btnDisable)
		})
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
				const result = await this.ongProvider.doClaims(this.account._privateKey)

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

		this.msgService.msg = 'claims-ong'


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

								const account = this.accountProvider.defaultAccount

								getWif(account.encrypted, passphrase).then((wif: any) => {
									// const pr = getPrivateKeyFromWIF(decrypt(this.account.encrypted, passphrase))
									const pr = getPrivateKeyFromWIF(wif)
									// console.log('getWif', pr)
									this.ongProvider.doClaims(c, pr, this.ongBalance).then(result => {

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
