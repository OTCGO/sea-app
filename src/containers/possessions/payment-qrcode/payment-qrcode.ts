import { Component } from '@angular/core'
import {
	IonicPage,
	NavParams,
	Platform
} from 'ionic-angular'
import { Clipboard } from '@ionic-native/clipboard'
import { SocialSharing } from '@ionic-native/social-sharing'
import { NotificationProvider } from '../../../providers/notification.provider'
import { TranslateService } from '@ngx-translate/core'


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
			  <div class="address" id="copy" >{{ address }}</div>

			  <button ion-button
			          class="otcgo-button--colour"
			          round
			          full
			          (click)="copy()" >{{ 'POSSESSIONS.QR_CODE.copy' | translate }}
			  </button>
			  <!--
			  <button ion-button
			          class="otcgo-button--edge"
			          round
			          clear
			          full
			          (click)="share()">{{ 'POSSESSIONS.QR_CODE.share' | translate }}
			  </button>
			  -->
		  </div>
	  </ion-content>
	`
})
export class PaymentQRCodePage {
	address: string


	constructor (
		private navParams: NavParams,
		private ts: TranslateService,
		private clipboard: Clipboard,
		private socialSharing: SocialSharing,
		private np: NotificationProvider,
		private platform: Platform
	) {
		this.address = navParams.get('address')
	}

	copy () {
		console.log('this.platform', this.platform)
		// console.log('element', element)
		if (this.platform.is('mobileweb')) {
			try {
				const el = document.createElement('textarea')
				el.value = this.address
				document.body.appendChild(el)
				el.select()
				document.execCommand('copy')
				document.body.removeChild(el)

				return this.np.emit({ message: `copy successful` })
			} catch (err) {
				console.log('unable to copy', err)
			}
		}

		let copyText
		this.ts.get('CW.BACKUP.success').subscribe(data => {
			copyText = data
		})


		this.clipboard.copy(this.address).then(() => this.np.emit({ message: copyText }))
	}

	share () {
		this.socialSharing.share(this.address)
	}
}
