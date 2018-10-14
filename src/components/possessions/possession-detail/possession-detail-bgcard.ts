import {
	Component,
	Input,
} from '@angular/core'
import { ModalController, NavController } from 'ionic-angular'

import { IBalance } from '../../../shared/models'

@Component({
	selector: 'possession-detail-bgcard',
	template: `

	  <ion-card class="possession-data-card">
		  <div class="possession-data-amount">{{ balance.amount?.toString() }} </div>
		  <!--
		  <div class="possession-data-approximation">≈ ￥ {{ balance.amount * price }}</div>

		  <button  color="light" ion-button round class="otcgo-button" (click)="showSendModal()" [disabled]="balance.amount <= 0">
			  {{ 'POSSESSIONS.DETAILS.transfer' | translate }}
		  </button>
		  -->

		  <!--
		  <button  color="light" *ngIf="balance.hash === 'ceab719b8baa2310f232ee0d277c061704541cfb'"   ion-button round  class="ont-map-btn" (click)="showMapModal()" [disabled]="balance.amount <= 0">
		  {{ 'POSSESSIONS.DETAILS.map' | translate }}
		  </button>

			<button  color="light"   ion-button round  class="custom-btn"  (click)="showSendModal()" [disabled]="balance.amount <= 0">
				{{ 'POSSESSIONS.DETAILS.transfer' | translate }}
			</button>
			-->

		<!--
		  <div class="tran_a">
				<button  color="light" *ngIf="balance.hash === 'ceab719b8baa2310f232ee0d277c061704541cfb'" ion-button round full  class="po-btn" (click)="showMapModal()" [disabled]="balance.amount <= 0">
				{{ 'POSSESSIONS.DETAILS.map' | translate }}
				</button>

				<button  color="light"   ion-button round full  class="po-btn"  (click)="showSendModal()" [disabled]="balance.amount <= 0">
					{{ 'POSSESSIONS.DETAILS.transfer' | translate }}
				</button>
		  </div>
		-->

	  </ion-card>
	`
})
export class PossessionDetailBgcard {
	// @Input() isScrollUp: boolean
	// @Input() isScrollDown: boolean
	// @Input() scrollTop = 0
	// @Input() differentScrollTop = 0
	@Input() balance: IBalance
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

	constructor(
		private navCtrl: NavController,
		private modalCtrl: ModalController) { }

	showSendModal() {
		this.navCtrl.push('SendModal')
	}

	showMapModal() {
		this.navCtrl.push('MapModal')
	}

	mapOnt() {

	}
}
