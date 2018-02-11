import { NgModule } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'
import { PossessionDetailPage } from './possession-detail'
import { TimelineModule } from '../../../components'

@NgModule({
	declarations: [
		PossessionDetailPage,
	],
	imports: [
		IonicPageModule.forChild(PossessionDetailPage),
		TimelineModule
	],
	exports: [
		PossessionDetailPage
	]
})
export class PossessionDetailPageModule {}
