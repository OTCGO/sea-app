import { NgModule } from '@angular/core';
import { TimelineModule } from './timeline'
import { SendModalModule } from './modals'
import { SlideCardModule } from './slide-card'
import { ExpansionModule } from './expansion-panel'

const MODULES = [
	TimelineModule,
	SendModalModule,
	SlideCardModule,
	ExpansionModule,
]

@NgModule({
	imports: MODULES,
	exports: MODULES,
})
export class ComponentsModule {}
