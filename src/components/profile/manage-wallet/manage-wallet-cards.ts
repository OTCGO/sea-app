import {
	Component,
	EventEmitter,
	Input,
	NgZone,
	OnDestroy,
	OnInit,
	Output,
	ViewChild
} from '@angular/core'
import { Store } from '@ngrx/store'
import { Slides } from 'ionic-angular'

import { combineLatest } from 'rxjs/observable/combineLatest'
import { IBalance } from '../../../shared/models'
import { Account } from '../../../shared/typings'
import { RootState } from '../../../store/reducers'
import { BalancesSelectors, PricesSelectors } from '../../../store/selectors'


@Component({
	selector: 'manage-wallet-cards',
	templateUrl: 'manage-wallet-cards.html'
})
export class ManageWalletCards implements OnInit, OnDestroy {
	@Input() currency: string
	@Input()
	get accounts () {
		return this._accounts
	}
	set accounts (val) {
		this._accounts = val
		if (!this.firstIn) {
			this.slides.slideTo(val && val.length - 2 || 0, 250, false)
		}
		this.firstIn = false
	}
	private _accounts: Account[]

	firstIn = true
	gases: number[] = []
	amounts: number[] = []


	@Output() onSaveAccount = new EventEmitter<Account>()
	@Output() onSetDefaultAccount = new EventEmitter<number>()
	@Output() onRemoveAccount = new EventEmitter<string>()
	@ViewChild(Slides) slides: Slides

	get showClose () {
		return this.accounts.length > 1
	}


	constructor (private store: Store<RootState>, private zone: NgZone) {}

	ngOnInit (): void {
		combineLatest(
			this.store.select(PricesSelectors.getEntities),
			this.store.select(BalancesSelectors.getNonZeroEntities)
		).subscribe(([prices, balancesEntities]) => {
			const gasPrice = Number(prices['GAS']) || 1
			this.amounts = Object.values(balancesEntities).map(this.mapAmounts)
			this.gases = this.amounts.map(amount => amount / gasPrice)
		})
	}

	ngOnDestroy (): void {
		this.firstIn = true
	}

	handleSlideChanged () {
		// console.log('Slide Changed', this.slides)
	}

	handleSaveAccount (account) {
		this.onSaveAccount.emit(account)
	}

	handleSetDefaultAccount (account) {
		this.onSetDefaultAccount.emit(account)
	}

	handleRemoveAccount (account) {
		this.onRemoveAccount.emit(account)
	}


  mapAmounts = (balances: IBalance[], prices) => balances.reduce((acc, {amount, symbol}) => acc + amount.times(prices[symbol] || 0).toNumber(), 0)
}
