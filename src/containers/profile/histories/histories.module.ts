import { NgModule } from '@angular/core'
import { TranslateModule } from '@ngx-translate/core'
import { IonicPageModule } from 'ionic-angular'
import { Histories } from './histories'
import { HistoriesCards } from '../../../components/profile/histories'

@NgModule({
	imports: [
		TranslateModule.forChild(),
		IonicPageModule.forChild(Histories),
	],
	declarations: [
		Histories,
		HistoriesCards
	]
})
export class HistoriesModule {}
