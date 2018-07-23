import { NgModule } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'
import { OngPage } from './ong'
import { TranslateModule } from '@ngx-translate/core'

@NgModule({
	declarations: [OngPage],
	imports: [
		TranslateModule.forChild(),
		IonicPageModule.forChild(OngPage),
	]
})
export class OngPageModule {}
