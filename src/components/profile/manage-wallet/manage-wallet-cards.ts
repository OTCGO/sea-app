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

import { Account } from '../../../shared/typings'
import { RootState } from '../../../store/reducers'


@Component({
	selector: 'manage-wallet-cards',
	templateUrl: 'manage-wallet-cards.html'
})
export class ManageWalletCards implements OnInit, OnDestroy {
	firstIn = true

	@Input() currency: string
	@Input() gasAmounts: number[] = []
	@Input() amounts: number[] = []

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

	@Output() onSaveAccount = new EventEmitter<Account>()
	@Output() onSetDefaultAccount = new EventEmitter<number>()
	@Output() onRemoveAccount = new EventEmitter<string>()
	@ViewChild(Slides) slides: Slides

	get showClose () {
		return this.accounts.length > 1
	}

	constructor (private store: Store<RootState>, private zone: NgZone) {}

	ngOnInit () {
		console.log(this)
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
}
