import {
	Component,
	EventEmitter,
	Input,
	Output,
	ViewChild
} from '@angular/core'
import { Slides } from 'ionic-angular'
import { Account } from '../../../shared/typings'


@Component({
	selector: 'manage-wallet-cards',
	templateUrl: 'manage-wallet-cards.html'
})
export class ManageWalletCards {
	firstIn = true

	@Input() currency: string
	@Input() gasAmounts: number[] = []
	@Input() amounts: number[] = []
	@Output() onSaveAccount = new EventEmitter<Account>()
	@Output() onSetDefaultAccount = new EventEmitter<number>()
	@Output() onRemoveAccount = new EventEmitter<string>()
	@ViewChild(Slides) slides: Slides

	get showRemoveIcon () { return this.accounts.length > 1 }

	@Input()
	get accounts () { return this._accounts }
	set accounts (val) {
		if (!this.firstIn && this.isDeletionOrAddition(val))
			this.slides.slideTo(val && val.length - 1 || 0, 250)
		this._accounts = val
		this.firstIn = false
	}
	private _accounts: Account[]

	isDeletionOrAddition (accounts) { return accounts.length !== this._accounts.length }
}
