import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {UNIQUE_SELECTION_DISPATCHER_PROVIDER} from '../core/cdk/collections';
import {CdkAccordionModule} from '../core/cdk/accordion';
import {PortalModule} from '../core/cdk/portal';
import {Accordion} from './accordion';
import {ExpansionPanelContent} from './expansion-panel-content';
import {
	ExpansionPanel,
	ExpansionPanelActionRow
} from './expansion-panel';
import {
	ExpansionPanelDescription,
	ExpansionPanelHeader,
	ExpansionPanelTitle,
} from './expansion-panel-header';


@NgModule({
	imports: [CommonModule, CdkAccordionModule, PortalModule],
	exports: [
		Accordion,
		ExpansionPanel,
		ExpansionPanelActionRow,
		ExpansionPanelHeader,
		ExpansionPanelTitle,
		ExpansionPanelDescription,
		ExpansionPanelContent,
	],
	declarations: [
		Accordion,
		ExpansionPanel,
		ExpansionPanelActionRow,
		ExpansionPanelHeader,
		ExpansionPanelTitle,
		ExpansionPanelDescription,
		ExpansionPanelContent,
	],
	providers: [UNIQUE_SELECTION_DISPATCHER_PROVIDER]
})
export class ExpansionModule {}
