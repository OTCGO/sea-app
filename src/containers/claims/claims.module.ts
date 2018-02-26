import { NgModule } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'
import { ClaimsPage } from './claims'
import { TranslateModule } from '@ngx-translate/core'

@NgModule({
	declarations: [ClaimsPage],
	imports: [
		TranslateModule.forChild(),
		IonicPageModule.forChild(ClaimsPage),
	],
	exports: [ClaimsPage]
})
export class ClaimsPageModule {}
