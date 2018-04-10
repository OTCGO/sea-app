import {
	Component,
	OnDestroy,
	OnInit
} from '@angular/core'
import { Store } from '@ngrx/store'
import { TranslateService } from '@ngx-translate/core'
import {
	IonicPage,
	NavParams
} from 'ionic-angular'
import { NotificationProvider } from '../../../../providers'
import { isAddress } from '../../../../shared/utils'
import { RootState } from '../../../../store/reducers'
import { ContactsActions } from '../../../../store/actions'
import { ContactsSelectors } from '../../../../store/selectors'


@IonicPage({
	name: 'EditContact'
})
@Component({
	selector: 'edit-contact',
	templateUrl: 'edit-contact.html'
})
export class EditContact implements OnInit, OnDestroy {
	translationPrefix = 'PROFILE.CONTACTS.EDIT.'
	counter = 0
	contactsEntities
	contact
	editMode = false
	nameHasChanged: boolean
	descriptionHasChanged: boolean
	addressHasChanged: boolean

	get isAddition () { return this.navParams.get('addition') }

	get avatar () { return this.contact && this.contact.avatar }

	get address () {
		return this.addressHasChanged ? this._address : this.contact && this.contact.address
	}
	set address (val) { this._address = val }
	private _address: string

	get description () {
		return this.descriptionHasChanged ? this._description : this.contact && this.contact.description
	}
	set description (val) { this._description = val }
	private _description: string

	get name () {
		return this.nameHasChanged ? this._name : this.contact && this.contact.name
	}
	set name (val) { this._name = val }
	private _name: string

	constructor (
		private store: Store<RootState>,
		private navParams: NavParams,
		private np: NotificationProvider,
		private ts: TranslateService,
	) {}

	ngOnInit () {
		this.store.select(ContactsSelectors.getSelectedContact).subscribe(selectedContact => this.contact = selectedContact || {})
		this.store.select(ContactsSelectors.getEntities).subscribe(entities => this.contactsEntities = entities || {})
	}

	ngOnDestroy () {
		this.store.dispatch(new ContactsActions.CleanSelect())
	}

	handleUpdateContact () {
		const { address, name, description, avatar } = this
		if (!isAddress(address)) return this.notifyMsg('address_error')
		if (!name) return this.notifyMsg('name_error')
		if (name.trim().length > 8) return this.notifyMsg('name_length_error')
		const changes = { address, name: name.trim(), description, avatar }
		const isChanged = this.isAddition && address in this.contactsEntities
		if (isChanged && this.counter === 0) {
			this.counter++
			this.notifyMsg('update_confirm')
			setTimeout(() => this.counter = 0, 500)
		} else {
			this.store.dispatch(new ContactsActions.Update({ id: address, changes }))
			this.notifyMsg('update_success')
		}
	}

	notifyMsg (suffix) {
		return this.ts.get(this.translationPrefix + suffix).take(1).subscribe(t => this.np.emit(t))
	}
}
