import { NgModule } from '@angular/core'
import { TranslateModule } from '@ngx-translate/core'
import { IonicPageModule } from 'ionic-angular'
import { HistoryDetail } from './history-detail'

@NgModule({
	imports: [
		TranslateModule.forChild(),
		IonicPageModule.forChild(HistoryDetail),
	],
	declarations: [
		HistoryDetail,
	]
})
export class HistoryDetailModule {}
