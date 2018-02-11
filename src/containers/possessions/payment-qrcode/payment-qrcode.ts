import { Component } from '@angular/core'
import { IonicPage, NavParams } from 'ionic-angular'
import { Clipboard } from '@ionic-native/clipboard'
import { SocialSharing } from '@ionic-native/social-sharing'

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

		    <div class="title">钱包地址</div>
		    <div class="address">{{ address }}</div>
		    
		    <button ion-button class="otcgo-button--colour" round full (click)="copy()">复制</button>
		    <button ion-button class="otcgo-button--edge" round clear full (click)="share()">分享</button>
      </div>
    </ion-content>
  `
})
export class PaymentQRCodePage {
  address: string

  constructor (navParams: NavParams, private clipboard: Clipboard, private socialSharing: SocialSharing) {
    this.address = navParams.get('address')
  }

  copy () {
    this.clipboard.copy(this.address)
  }


  share () {
    this.socialSharing.share(this.address)
  }
}