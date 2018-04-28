import { Component } from '@angular/core'
import {
	IonicPage,
	NavParams,
	Platform
} from 'ionic-angular'
import { Clipboard } from '@ionic-native/clipboard'
import { SocialSharing } from '@ionic-native/social-sharing'
import { NotificationProvider } from '../../../providers/notification.provider'

@IonicPage({
	name: 'payment-qrcode'
})
@Component({
	selector: 'page-payment-qrcode',
	template: `
	  <ion-header class="otcgo-header">
		  <ion-navbar></ion-navbar>
	  </ion-header>
	  <ion-content>
		  <div class="qrcode__content">
			  <ngx-qrcode [qrc-value]="address"></ngx-qrcode>

			  <div class="title">{{ 'POSSESSIONS.QR_CODE.address' | translate }}</div>
			  <div class="address">{{ address }}</div>

			  <button ion-button
			          class="otcgo-button--colour"
			          round
			          full
			          (click)="copy()">{{ 'POSSESSIONS.QR_CODE.copy' | translate }}
			  </button>
			  <button ion-button
			          class="otcgo-button--edge"
			          round
			          clear
			          full
			          (click)="share()">{{ 'POSSESSIONS.QR_CODE.share' | translate }}
			  </button>
		  </div>
	  </ion-content>
	`
})
export class PaymentQRCodePage {
	address: string

	constructor (
		navParams: NavParams,
		private clipboard: Clipboard,
		private socialSharing: SocialSharing,
		private np: NotificationProvider,
		private platform: Platform
	) {
		this.address = navParams.get('address')
	}

	copy () {
		if (this.platform.is('mobileweb')) {
			try {
				const successful = document.execCommand('copy')
				const msg = successful ? 'successful' : 'fail'
				return this.np.emit({ message: `copy ${msg}` })
			} catch (err) {
				console.log('unable to copy', err)
			}
		}
		this.clipboard.copy(this.address).then(() => this.np.emit({ message: 'copy success' }))
	}

	share () {
		this.socialSharing.share(this.address)
	}
}
