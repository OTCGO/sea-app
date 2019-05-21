import { NgModule } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'
import { SeacPage } from './seac'
import { TranslateModule } from '@ngx-translate/core'

@NgModule({
	declarations: [SeacPage],
	imports: [
		TranslateModule.forChild(),
		IonicPageModule.forChild(SeacPage),
	]
})
export class SeacPageModule {}
