import {
	Component,
	OnInit
} from '@angular/core'
import { Store } from '@ngrx/store'
import { TranslateService } from '@ngx-translate/core'
import {
	AlertController,
	IonicPage,
	NavController,
	NavParams,
	ViewController
} from 'ionic-angular'
import {
	addIndex,
	concat,
	map,
	compose,
	mergeAll
} from 'ramda'
import { Observable } from 'rxjs/Observable'
import { Contact } from '../../../shared/models/contacts.model'
import { TransactionsActions, ContactsActions } from '../../../store/actions'
import { RootState } from '../../../store/reducers'
import { ContactsSelectors } from '../../../store/selectors'

@IonicPage({
	name: 'Contacts'
})
@Component({
	selector: 'page-contacts',
	templateUrl: 'contacts.html'
})
export class ContactsPage implements OnInit {
	contacts: Observable<Contact[]> = this.store.select(ContactsSelectors.getAll)

	constructor (
		private navCtrl: NavController,
		private navParams: NavParams,
		private alertCtrl: AlertController,
		private ts: TranslateService,
		private viewCtrl: ViewController,
		private store: Store<RootState>,
	) { }

	get isFromProfile () {
		// If not define, set to true, else is false
		return typeof this.navParams.get('fromProfile') === 'undefined'
	}

	ngOnInit () {

	}

	handleContactRemove (contact) {
		const prefix = 'PROFILE.CONTACTS.'
		const translations = ['remove_title', 'remove_agree', 'remove_disagree']
		const withPrefixTranslations = map(concat(prefix), translations)
		const mapIndexed = addIndex(map)

		this.ts.get(withPrefixTranslations).subscribe(trs => {
			const toObject = (key, idx) => ({ [translations[idx]]: trs[key] })
			const agreeHandler = () => this.store.dispatch(new ContactsActions.Remove(contact))

			const entities = compose(
				mergeAll,
				mapIndexed(toObject)
			)(withPrefixTranslations)
			this.createPrompt(entities, agreeHandler)
		})
	}

	handleContactEdit (address) {
		this.store.dispatch(new ContactsActions.Select(address))
		this.navCtrl.push('EditContact')
	}

	handleContactSelect (address) {
		this.store.dispatch(new TransactionsActions.SelectContact(address))
		this.viewCtrl.dismiss()
	}

	createPrompt (entities, handler) {
		const removePrompt = this.alertCtrl.create({
			title: entities['remove_title'],
			buttons: [
				{ text: entities['remove_disagree'] },
				{ text: entities['remove_agree'], handler }
			]
		})
		removePrompt.present()
	}
}
