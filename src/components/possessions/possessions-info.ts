import { Component, Input } from '@angular/core'
import { NavController } from 'ionic-angular'
import { Account } from '../../shared/typings'

@Component({
	selector: 'possessions-info',
	template: `
		<ion-card class="card-info">
				<div class="card-avatar" (click)="openQRCode()">
					<img src="assets/imgs/icon-qrcode-avatar.png" alt="">
				</div>
		  <div class="card-title">{{ account?.address | addressCollapse }}</div>
			<div class="bg"></div>
	  </ion-card>
		<div class="card-round"></div>
	`
})
export class PossessionsInfoComponent {
	@Input() account: Account

	constructor (private navCtrl: NavController) {}

	openQRCode () {
		this.navCtrl.push('payment-qrcode', { address: this.account && this.account.address })
	}
}

