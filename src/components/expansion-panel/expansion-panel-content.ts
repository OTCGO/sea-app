import { Directive, TemplateRef } from '@angular/core'

@Directive({
	selector: 'ng-template[ExpansionPanelContent]'
})
export class ExpansionPanelContent {
	constructor (public template: TemplateRef<any>) {}
}