import {
	Component,
	ElementRef,
	ViewChild
} from '@angular/core'
import { Clipboard } from '@ionic-native/clipboard'
import { Store } from '@ngrx/store'
import {
	AlertController,
	IonicPage,
	LoadingController,
	ModalController
} from 'ionic-angular'
import { ManageWalletCards } from '../../../components/profile/manage-wallet'
import { WalletProvider } from '../../../providers/wallet/wallet.provider'
import { Account } from '../../../shared/typings'
import { nep5Wallet } from '../../../shared/userWallet'
import {
	AuthActions,
	WalletActions
} from '../../../store/actions'

import { RootState } from '../../../store/reducers'
import {
	PricesSelectors,
	SettingsSelectors,
	WalletSelectors
} from '../../../store/selectors'

@IonicPage({
	name: 'ManageWallet',
	segment: 'manage-wallet'
})
@Component({
	selector: 'page-manage-wallet',
	templateUrl: 'manage-wallet.html'
})
export class ManageWalletPage {
	// accounts = this.accountProvider.accounts
	accounts = this.store.select(WalletSelectors.getAccounts)
	currency = this.store.select(SettingsSelectors.getCurrency)
	amounts = this.store.select(PricesSelectors.getAmounts)
	gasAmounts = this.store.select(PricesSelectors.getGASAmounts)
	@ViewChild('cards') cards: ManageWalletCards

	constructor (
		private alertCtrl: AlertController,
		private walletProvider: WalletProvider,
		private clipBoard: Clipboard,
		private loadingCtrl: LoadingController,
		private modalCtrl: ModalController,
		private elementRef: ElementRef,
		private store: Store<RootState>
	) { }

	get marginTop () {
		return parseInt(this.elementRef.nativeElement.querySelector('.scroll-content').style.marginTop) / 2 + 'px'
	}

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
		const { marginTop } = this
		const data = { account, offsetHeight, offsetWidth, marginTop }
		this.openModal(data)
	}

	openModal (data) {
		const removeModal = this.modalCtrl.create(
			'RemoveAccountModal',
			data,
			{ cssClass: 'sea-card' }
		)
		removeModal.present()
	}
}
