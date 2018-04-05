import {
	Component,
	EventEmitter,
	Input,
	OnDestroy,
	Output,
	ViewChild
} from '@angular/core'
import { Slides } from 'ionic-angular'

import { Account } from '../../../shared/typings'

@Component({
	selector: 'manage-wallet-cards',
	templateUrl: 'manage-wallet-cards.html'
})
export class ManageWalletCards implements OnDestroy {
	firstIn = true

	@Input() currency: string
	@Input() gasAmounts: number[] = []
	@Input() amounts: number[] = []
	@Output() onSaveAccount = new EventEmitter<Account>()
	@Output() onSetDefaultAccount = new EventEmitter<number>()
	@Output() onRemoveAccount = new EventEmitter<string>()
	@ViewChild(Slides) slides: Slides

	private _accounts: Account[]

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

	get showClose () {
		return this.accounts.length > 1
	}

	ngOnDestroy (): void { this.firstIn = true }

	handleSaveAccount (account) { this.onSaveAccount.emit(account) }

	handleSetDefaultAccount (account) { this.onSetDefaultAccount.emit(account) }

	handleRemoveAccount (account) { this.onRemoveAccount.emit(account) }
}
