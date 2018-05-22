import {
	Component,
	EventEmitter,
	Input,
	Output,
} from '@angular/core'
import { Contact } from '../../../shared/models/contacts.model'

@Component({
	selector: 'contacts-cards',
	templateUrl: 'contacts-cards.html'
})
export class ContactsCards {
	@Input() contacts: Contact[]
	@Input() isFromProfile: boolean

	@Output() edit = new EventEmitter()
	@Output() remove = new EventEmitter()
	@Output() select = new EventEmitter()
}
