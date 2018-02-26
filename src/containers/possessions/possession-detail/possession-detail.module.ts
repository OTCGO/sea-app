import { NgModule } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'
import { PossessionDetailPage } from './possession-detail'
import { TimelineModule } from '../../../components'
import { TranslateModule } from '@ngx-translate/core'

@NgModule({
	declarations: [
		PossessionDetailPage,
	],
	imports: [
		TranslateModule.forChild(),
		TimelineModule,
		IonicPageModule.forChild(PossessionDetailPage)
	],
	exports: [
		PossessionDetailPage
	]
})
export class PossessionDetailPageModule {}
