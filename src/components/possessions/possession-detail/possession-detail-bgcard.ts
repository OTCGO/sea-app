import {
	Component,
	Input,
} from '@angular/core'
import { ModalController, NavController } from 'ionic-angular'
import { wallet } from '../../../libs/neon'
import { IBalance } from '../../../shared/models'
import { ApiProvider, AccountProvider } from '../../../providers'
import {
	getWif
} from '../../../store/selectors/wallet.selector'
import { Store } from '@ngrx/store'
import { RootState } from '../../../store/reducers'
import { TranslateService } from '@ngx-translate/core'
import { NotificationProvider } from '../../../providers'

const { generateSignature, getPrivateKeyFromWIF } = wallet

@Component({
	selector: 'possession-detail-bgcard',
	template: `

	  <ion-card class="possession-data-card">
		  <div class="possession-data-amount">{{ balance.amount?.toString() }} </div>

		  <div class="tran_a">

			<button  color="light"
			*ngIf="balance.hash === 'a52e3e99b6c2dd2312a94c635c050b4c2bc2485fcb924eecb615852bd534a63f' || balance.hash === '30e9636bc249f288139651d60f67c110c3ca4c3dd30ddfa3cbcec7bb13f14fd4'"
			 ion-button round full  class="po-btn" (click)="swap(balance.hash)" [disabled]="balance.amount <= 0 || !btnSwap">
			 {{ 'POSSESSIONS.DETAILS.swap' | translate }}
			</button>


			<button  color="light"
			*ngIf="balance.hash !== 'a52e3e99b6c2dd2312a94c635c050b4c2bc2485fcb924eecb615852bd534a63f' && balance.hash !== '30e9636bc249f288139651d60f67c110c3ca4c3dd30ddfa3cbcec7bb13f14fd4'"
			ion-button round full  class="po-btn"  (click)="showSendModal()" [disabled]="balance.amount <= 0">
				{{ 'POSSESSIONS.DETAILS.transfer' | translate }}
			</button>
		  </div>


	  </ion-card>
	`
})
export class PossessionDetailBgcard {
	// @Input() isScrollUp: boolean
	// @Input() isScrollDown: boolean
	// @Input() scrollTop = 0
	// @Input() differentScrollTop = 0
	@Input() balance: IBalance
	private btnSwap = true
	// @Input() price: number

	// downBoundary = window.outerHeight * 0.2
	// upBoundary = window.outerHeight * 0.55

	// get height () {
	// 	const { upBoundary, downBoundary, isScrollUp, scrollTop } = this
	// 	const computedResult = isScrollUp
	// 		? downBoundary
	// 		: Math.max(upBoundary - scrollTop, downBoundary)

	// 	const historyBoundary = downBoundary + window.outerHeight * 0.2
	// 	if (scrollTop < historyBoundary && isScrollUp) return `${upBoundary}px`
	// 	return `${computedResult}px`
	// }

	account = this.accountProvider.defaultAccount

	constructor(
		private ts: TranslateService,
		private notificationProvider: NotificationProvider,
		private store$: Store<RootState>,
		private navCtrl: NavController,
		private apiProvider: ApiProvider,
		private accountProvider: AccountProvider,
		private modalCtrl: ModalController) { }

	showSendModal() {
		this.navCtrl.push('SendModal')
	}

	// seac seas
	async swap(asset) {
		try {
			const result = await this.getSwap(asset)

			if (!result.result) {
				this.ts.get('POSSESSIONS.DETAILS.swap_error').subscribe(d => {
					this.notificationProvider.emit({ message: d })
				})
			}

			this.store$.select(getWif).subscribe(async data => {
				try {
					console.log('wif', data)
					const pr = getPrivateKeyFromWIF(data.wif)
					const sign = this.generateSignatureAndData(result.transaction, pr)
					console.log('swap:sign', sign)
					const res: any = await this.apiProvider.broadcast(sign).toPromise()
					console.log('res', res)

					if (res.result) {
						this.btnSwap = false
						this.ts.get('POSSESSIONS.DETAILS.swap_success').subscribe(d => {
							this.notificationProvider.emit({ message: d })
						})
					}

				} catch (error) {
					console.log('swap:error', error)

					this.ts.get('POSSESSIONS.DETAILS.swap_error').subscribe(d => {
						this.notificationProvider.emit({ message: d })
					})
				}
			})
		} catch (error) {
			console.log('swap', error)
			this.ts.get('POSSESSIONS.DETAILS.swap_error').subscribe(d => {
				this.notificationProvider.emit({ message: d })
			})
		}

	}

	showMapModal() {
		this.navCtrl.push('MapModal')
	}

	mapOnt() {

	}

	getSwap(asset) {
		return this.apiProvider.get(`swap/${this.account.address}/${asset}`).toPromise()
	}


	private generateSignatureAndData(transaction, pr) {

		console.log('generateSignature', pr)

		const publicKey = wallet.getPublicKeyFromPrivateKey(pr, true)

		const signature = generateSignature(transaction, pr)

		return {
			publicKey,
			signature,
			transaction
		}
	}

}
