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
import {
	NotificationProvider,
	WalletProvider
} from '../../../providers'
import { Account } from '../../../shared/typings'
import { WalletActions } from '../../../store/actions'
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
	translationPrefix = 'PROFILE.MANAGE_WALLET.'
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
		private np: NotificationProvider,
		private store: Store<RootState>
	) { }

	get marginTop () {
		return parseInt(this.elementRef.nativeElement.querySelector('.scroll-content').style.marginTop) / 2 + 'px'
	}

	handleSetDefaultAccount (account) {
		this.store.dispatch(new WalletActions.SetDefaultAccount(account))
	}

	handleSaveAccount (account: Account) {
		this.store.dispatch(new WalletActions.ChangeAccountLabel(account))
		this.np.notifyTranslation(this.translationPrefix + 'save_success')
	}

	handleRemoveAccount (account) {
		// this.store.dispatch(new WalletActions.RemoveAccount(account))
		const { offsetHeight, offsetWidth } = this.cards.slides.container.querySelector('.card') as HTMLElement
		const { marginTop } = this
		this.openModal({ account, offsetHeight, offsetWidth, marginTop })
	}

	openModal (data) {
		this.modalCtrl.create('RemoveAccountModal', data, { cssClass: 'sea-card' }).present()
	}
}
