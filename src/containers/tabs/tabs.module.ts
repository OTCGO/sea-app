import { NgModule } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'

import { TabsPage } from './tabs'

const COMPONENT = [
	TabsPage
]

@NgModule({
	declarations: COMPONENT,
	imports: [
		IonicPageModule.forChild(TabsPage),
	],
	exports: COMPONENT
})
export class TabsPageModule {}
