import { NgModule } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'
import { MarketsPage } from './markets'

const COMPONENTS = [
	MarketsPage
]

@NgModule({
	declarations: COMPONENTS,
	imports: [
		IonicPageModule.forChild(MarketsPage),
	],
	exports: COMPONENTS
})
export class MarketsPageModule {}
