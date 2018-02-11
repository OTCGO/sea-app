import { NgModule } from '@angular/core'
import { UNIQUE_SELECTION_DISPATCHER_PROVIDER } from '../collections'
import { CdkAccordion } from './accordion'
import { CdkAccordionItem } from './accordion-item'

@NgModule({
	exports: [CdkAccordion, CdkAccordionItem],
	declarations: [CdkAccordion, CdkAccordionItem],
	providers: [UNIQUE_SELECTION_DISPATCHER_PROVIDER],
})
export class CdkAccordionModule {}
