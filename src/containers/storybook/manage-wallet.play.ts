import {
	Component,
	ElementRef,
	OnInit,
	ViewChild
} from '@angular/core'
import { Store } from '@ngrx/store'
import { ManageWalletCards } from '../../components/profile/manage-wallet'
import { ModalController } from 'ionic-angular'
import { nep5Wallet } from '../../shared/userWallet'
import { WalletActions, AuthActions } from '../../store/actions'
import { RootState } from '../../store/reducers'
import { WalletSelectors, SettingsSelectors } from '../../store/selectors'
import { Account } from '../../shared/typings'


@Component({
	selector: 'manage-wallet-play',
	template: `
	  <ion-content>
		  <manage-wallet-cards
				#cards
			  [accounts]="accounts | async"
			  [currency]="currency | async"
				(onSaveAccount)="handleSaveAccount($event)"
				(onRemoveAccount)="handleRemoveAccount($event)"
				(onSetDefaultAccount)="handleSetDefaultAccount($event)"
		  ></manage-wallet-cards>
	  </ion-content>
	`
})
export class ManageWalletPlay implements OnInit {
	accounts = this.store.select(WalletSelectors.getAccounts)
	currency = this.store.select(SettingsSelectors.getCurrency)

	@ViewChild('cards') cards: ManageWalletCards

	constructor (private store: Store<RootState>, private modalCtrl: ModalController) {}

	ngOnInit () {
		this.store.dispatch(new AuthActions.Login(nep5Wallet))
	}

	handleSetDefaultAccount (account) {
		this.store.dispatch(new WalletActions.SetDefaultAccount(account))
	}

	handleSaveAccount (account: Account) {
		this.store.dispatch(new WalletActions.ChangeAccountLabel(account))
	}

	handleRemoveAccount (account) {
		// this.store.dispatch(new WalletActions.RemoveAccount(account))
		const { offsetHeight, offsetWidth } = this.cards.slides.container.querySelector('.card') as HTMLElement
		const data = { account, offsetHeight, offsetWidth, }
		this.openModal(data)
	}

	openModal (data) {
		const removeModal = this.modalCtrl.create('RemoveAccountModal', data, {
			cssClass: 'sea-card'
		})
		removeModal.present()
	}
}
