import { NgModule } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'
import { TranslateModule } from '@ngx-translate/core'
import { PossessionDetailPage } from './possession-detail'
import { TimelineModule } from '../../../components'
import { PossessionDetailHistory, PossessionDetailBgcard } from '../../../components/possessions/possession-detail'
import { PipesModule } from '../../../pipes/pipes.module'

@NgModule({
	declarations: [
		PossessionDetailPage,
		PossessionDetailBgcard,
		PossessionDetailHistory
	],
	imports: [
		TimelineModule,
		TranslateModule.forChild(),
		IonicPageModule.forChild(PossessionDetailPage),
		PipesModule
	]
})
export class PossessionDetailPageModule {}
