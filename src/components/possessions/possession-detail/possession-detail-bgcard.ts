import {
	Component,
	Input,
} from '@angular/core'
import { ModalController } from 'ionic-angular'

import { IBalance } from '../../../shared/models'

@Component({
	selector: 'possession-detail-bgcard',
	template: `

	  <ion-card class="possession-data-card">
		  <div class="possession-data-amount">{{ balance.amount?.toString() }} {{ balance.symbol }}</div>
		  <!--
		  <div class="possession-data-approximation">≈ ￥ {{ balance.amount * price }}</div>
		  -->
		  <button  color="light" ion-button round class="otcgo-button" (click)="showSendModal()" [disabled]="balance.amount <= 0">
			  {{ 'POSSESSIONS.DETAILS.transfer' | translate }}
		  </button>
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

	constructor(private modalCtrl: ModalController) {}

	showSendModal () {
		const sendModal = this.modalCtrl.create(
			'SendModal',
			null,
			{ cssClass: 'inset-modal', enableBackdropDismiss: true }
		)
		return sendModal.present()
	}
}
