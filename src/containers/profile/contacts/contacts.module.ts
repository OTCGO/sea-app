import { NgModule } from '@angular/core'

import { ContactsPage } from './contacts'
import { IonicPageModule } from 'ionic-angular'

@NgModule({
	declarations: [ContactsPage],
	imports: [IonicPageModule.forChild(ContactsPage)],
	exports: [ContactsPage]
})
export class ContactsPageModule {}
