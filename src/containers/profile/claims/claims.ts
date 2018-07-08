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
import { TranslateService } from '@ngx-translate/core'
import { getWif } from '../../../shared/utils'

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

	constructor(
		private ts: TranslateService,
		private claimsProvider: ClaimsProvider,
		private accountProvider: AccountProvider,
		private alertCtrl: AlertController,
		private store: Store<RootState>,
		private loadingCtrl: LoadingController
	) { }

	ionViewDidLoad() {
		this.store.dispatch(new ClaimsActions.Load())
		this.claims = this.store.select(ClaimsSelectors.getEntities)
	}

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


		console.log('successText', successText)
		console.log('failText', failText)


		this.claims.subscribe(data => {

			const prompt = this.alertCtrl.create({
				title: title,
				// message: title,
				inputs: [{ name: 'passphrase', placeholder: title, type: 'password' }],
				buttons: [
					{ text: btnCancle },
					{
						text: btnConfirm,
						handler: ({ passphrase }) => {
							try {
								if (!passphrase || passphrase === '' || passphrase.length < 4) return false

								const loading = this.loadingCtrl.create()
								loading.present().then(() => {
									this.btnLoading = true

									getWif(this.account.encrypted, passphrase).then((wif: any) => {
										// const pr = getPrivateKeyFromWIF(decrypt(this.account.encrypted, passphrase))
										const pr = getPrivateKeyFromWIF(wif)
										console.log('getWif', pr)
										this.claimsProvider.doClaims(data, pr).then(result => {

											prompt.dismiss().catch(() => { })
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

										prompt.dismiss().catch(() => { })
										loading.dismiss().catch(() => { }).catch(() => { })
										this.btnLoading = false
									})



								}).catch((e) => {
									this.showPrompt(failText)
									console.log(e)

									prompt.dismiss().catch(() => { })
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
			prompt.present()



			/*
			// unavailable === '0'
			console.log('data.unavailable', data.unavailable === '0')
			if (data.unavailable === '0') {

				// file login
				const prompt = this.alertCtrl.create({
					title: title,
					// message: title,
					inputs: [{ name: 'passphrase', placeholder: title, type: 'password' }],
					buttons: [
						{ text: btnCancle },
						{
							text: btnConfirm,
							handler: ({ passphrase }) => {
								try {
									if (!passphrase || passphrase === '' || passphrase.length < 4) return false

									const loading = this.loadingCtrl.create()
									loading.present().then(() => {
										this.btnLoading = true

										getWif(this.account.encrypted, passphrase).then((wif: any) => {
											// const pr = getPrivateKeyFromWIF(decrypt(this.account.encrypted, passphrase))
											const pr = getPrivateKeyFromWIF(wif)
											this.claimsProvider.doClaimsUnavailable(pr).then(result => {

												prompt.dismiss().catch(() => { })
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

											prompt.dismiss().catch(() => { })
											loading.dismiss().catch(() => { }).catch(() => { })
											this.btnLoading = false
										})



									}).catch((e) => {
										this.showPrompt(failText)
										console.log(e)

										prompt.dismiss().catch(() => { })
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
				prompt.present()
			} else {

				// file login
				const prompt = this.alertCtrl.create({
					title: title,
					// message: title,
					inputs: [{ name: 'passphrase', placeholder: title, type: 'password' }],
					buttons: [
						{ text: btnCancle },
						{
							text: btnConfirm,
							handler: ({ passphrase }) => {
								try {
									if (!passphrase || passphrase === '' || passphrase.length < 4) return false

									const loading = this.loadingCtrl.create()
									loading.present().then(() => {
										this.btnLoading = true

										getWif(this.account.encrypted, passphrase).then((wif: any) => {
											// const pr = getPrivateKeyFromWIF(decrypt(this.account.encrypted, passphrase))
											const pr = getPrivateKeyFromWIF(wif)
											this.claimsProvider.doClaims(pr).then(result => {

												prompt.dismiss().catch(() => { })
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

											prompt.dismiss().catch(() => { })
											loading.dismiss().catch(() => { }).catch(() => { })
											this.btnLoading = false
										})



									}).catch((e) => {
										this.showPrompt(failText)
										console.log(e)

										prompt.dismiss().catch(() => { })
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
				prompt.present()
			}

			*/
		})




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
