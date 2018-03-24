import {
	Component,
	EventEmitter,
	Input,
	OnInit,
	Output,
} from '@angular/core'
import { wallet } from '../../../libs/neon'
import { Account } from '../../../shared/typings'


@Component({
	selector: 'manage-wallet-card',
	templateUrl: 'manage-wallet-card.html'
})
export class ManageWalletCard implements OnInit {
	@Input() account: Account
	@Input() oCurrency: string
	@Input() amount: number
	@Input() gas: number
	@Input() showClose: boolean
	@Output() onSave = new EventEmitter<Account>()
	@Output() onRemove = new EventEmitter<Account>()
	@Output() onSetDefault = new EventEmitter<Account>()

	tempLabel = ''

	get label () { return this.account.label }
	get isDefault () { return this.account.isDefault }

	ngOnInit () {}

	handleRemoveClick (account) {
		this.onRemove.emit(account)
	}

	handleSaveClick (account) {
		if (this.tempLabel) {
			const acct = new wallet.Account(account)
			acct.label = this.tempLabel
			this.onSave.emit(acct)
			this.tempLabel = ''
		}
	}

	handleSetDefaultClick (account) {
		this.onSetDefault.emit(account)
	}

	handleWIFClick (account) {
		console.log(account)
	}

	handleEncryptedClick (account) {

	}


	/* Leave this two for later feature */
	handleOpenLocationClick () {

	}

	handlePrivateKeyClick (account) {

	}
}
