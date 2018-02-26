import { NgModule } from '@angular/core'

import { ContactsPage } from './contacts'
import { IonicPageModule } from 'ionic-angular'
import { TranslateModule } from '@ngx-translate/core'

@NgModule({
	declarations: [ContactsPage],
	imports: [
		TranslateModule.forChild(),
		IonicPageModule.forChild(ContactsPage)
	],
	exports: [ContactsPage]
})
export class ContactsPageModule {}
