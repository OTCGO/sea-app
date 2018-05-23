import { NgModule } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'
import { MarketsPage } from './markets'
import { TranslateModule } from '@ngx-translate/core'

const COMPONENTS = [
	MarketsPage
]

@NgModule({
	declarations: COMPONENTS,
	imports: [
		TranslateModule.forChild(),
		IonicPageModule.forChild(MarketsPage),
	],
	exports: COMPONENTS
})
export class MarketsPageModule {}
