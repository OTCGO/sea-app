import { NgModule } from '@angular/core'
import { TranslateModule } from '@ngx-translate/core'
import { IonicPageModule } from 'ionic-angular'

import { EditContact } from './edit-contact'

@NgModule({
	imports: [
		IonicPageModule.forChild(EditContact),
		TranslateModule.forChild()
	],
	declarations: [EditContact],
})
export class EditContactModule {}
