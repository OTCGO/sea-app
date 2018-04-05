import { NgModule } from '@angular/core'
import { ContactsCards } from '../../../components/profile/contacts'

import { ContactsPage } from './contacts'
import { IonicPageModule } from 'ionic-angular'
import { TranslateModule } from '@ngx-translate/core'

@NgModule({
	declarations: [
		ContactsPage,
		ContactsCards
	],
	imports: [
		TranslateModule.forChild(),
		IonicPageModule.forChild(ContactsPage)
	]
})
export class ContactsPageModule {}
