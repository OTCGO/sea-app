import {
	Component,
	OnInit,
} from '@angular/core'
import { Store } from '@ngrx/store'
import {
	IonicPage,
	NavParams,
	ViewController
} from 'ionic-angular'
import { WalletActions } from '../../../store/actions'
import { RootState } from '@store/reducers'
/* TODO: The path is working there with RootState */

@IonicPage({
	name: 'RemoveAccountModal'
})
@Component({
	selector: 'remove-account-modal',
	template: `
	  <ion-slides [style.marginTop]="marginTop">
		  <ion-slide>
			  <div class="card"
			       [style.height]="height"
			       [style.width]="width">
				  <div class="close">
							<div class="icon"
									 (click)="handleCloseClick()">
									<ion-icon name="close"></ion-icon>
							</div>
					</div>

				  <div class="rm-header">
						{{ 'PROFILE.MANAGE_WALLET.REMOVE_ACCOUNT.title' | translate }}
					</div>

				  <div class="rm-content">
					  {{ 'PROFILE.MANAGE_WALLET.REMOVE_ACCOUNT.tips_prefix' | translate }}
					  <span>{{ label }}</span>
					  {{ 'PROFILE.MANAGE_WALLET.REMOVE_ACCOUNT.tips_suffix' | translate }}
				  </div>

				  <!--<div class="rm-passphrase">
							<ion-input class="rm-passphrase__input"
												 placeholder="{{ 'PROFILE.MANAGE_WALLET.REMOVE_ACCOUNT.input' | translate }}"
												 type="password"
												 [(ngModel)]="passphrase"></ion-input>
					</div>-->

				  <div class="rm-confirm">
					  <button ion-button
					          class="otcgo-button--colour"
					          block
					          round
					          (click)="handleConfirmClick()">
						  {{ 'PROFILE.MANAGE_WALLET.REMOVE_ACCOUNT.confirm' | translate }}
					  </button>
				  </div>
			  </div>
		  </ion-slide>
	  </ion-slides>
	`
})
export class RemoveAccountModal implements OnInit {
	constructor (
		private navParams: NavParams,
		private viewCtrl: ViewController,
		private store: Store<RootState>) { }

	ngOnInit () {}

	get width () {
		return `${this.navParams.get('offsetWidth')}px`
	}

	get height () {
		return `${this.navParams.get('offsetHeight')}px`
	}

	get account () {
		return this.navParams.get('account')
	}

	get marginTop () {
		return this.navParams.get('marginTop')
	}

	get label () {
		return this.account.label
	}

	handleCloseClick () {
		this.viewCtrl.dismiss().catch(() => {})
	}

	handleConfirmClick () {
		this.store.dispatch(new WalletActions.RemoveAccount(this.account))
		this.handleCloseClick()
	}
}
