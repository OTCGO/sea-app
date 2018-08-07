import { Component, Input, OnInit } from '@angular/core'
import { NavController } from 'ionic-angular'
import { Account } from '../../shared/typings'
import { ApiProvider } from '../../providers'
import { interval } from 'rxjs/observable/interval'

@Component({
	selector: 'possessions-info',
	template: `
		<ion-card class="card-info">
			<div class="block-height">

				<div class="height"><img src="assets/imgs/height.png" style="width:2.5rem;display:inline" > {{ blockHeight }} </div>
				<p class="countdown"> {{ countdown }} </p>
			</div>
			<div class="card-avatar" (click)="openQRCode()">
				<img src="assets/imgs/icon-qrcode-avatar.png" alt="">
			</div>
		  <div class="card-title">{{ account?.address | addressCollapse }}</div>
		 <div class="bg"></div>
	  </ion-card>
	  <div class="card-round"></div>
	`
})
export class PossessionsInfoComponent implements OnInit {
	@Input() account: Account

	private  blockHeight = 0
	private  countdown = 0

	constructor(private navCtrl: NavController,
		private apiProvider: ApiProvider,
	) { }

	openQRCode() {
		this.navCtrl.push('payment-qrcode', { address: this.account && this.account.address })
	}

	async ngOnInit() {
		// this.blockHeight = await this.getHeight()

		this.getHeight()
		this.getCountDown()
	}

	async getHeight() {

		interval(3000).subscribe(async () => {
			const result = await this.apiProvider.get('height').toPromise()
			if (result && Number(result.height) > Number(this.blockHeight)) {

				this.countdown = 0
				this.blockHeight = result.height
				// return result.height
			}

			// return 0
		})

		// console.log('result', result)
	}

	getCountDown() {
		interval(1000).subscribe(() => {
			this.countdown ++

			console.log('getCountDown', this.countdown)
		})


	}

}

