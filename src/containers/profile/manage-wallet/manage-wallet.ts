import {
	Component,
	ElementRef,
	ViewChild
} from '@angular/core'
import { Store } from '@ngrx/store'
import {
	AlertController,
	LoadingController,
	Loading,
	IonicPage,
	AlertOptions,
	ModalController
} from 'ionic-angular'
import { Clipboard } from '@ionic-native/clipboard'

import { RootState } from '../../../store/reducers'
import { Account } from '../../../shared/typings'
import { nep5Wallet } from '../../../shared/userWallet'
import {
	SettingsSelectors,
	WalletSelectors
} from '../../../store/selectors'
import {
	AuthActions,
	WalletActions
} from '../../../store/actions'
import { WalletProvider } from '../../../providers/wallet/wallet.provider'
import { ManageWalletCards } from '../../../components/profile/manage-wallet'
import { wallet } from '../../../libs/neon'
import { concat, flip, divide, path, split, compose } from 'ramda'


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

	get marginTop () {
		const splitByDot = split('.')
		type querySelector = (str: string) => NodeList
		const scrollContent = this.elementRef.nativeElement.querySelector('.scroll-content')
		const scrollContentMarginTop = path(splitByDot('style.marginTop'), scrollContent)

		const divideBy = flip(divide)
		const stringAppend = flip(concat)
		const toString = n => n.toString()
		return compose(
			stringAppend('px'),
			toString,
			divideBy(2),
			parseInt,
			path(splitByDot('style.marginTop'))
		)(scrollContentMarginTop)
	}

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
