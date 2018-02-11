import { Directive, Input } from '@angular/core'
import { coerceBooleanProperty } from '../coercion'

let nextId = 0

@Directive({
	selector: 'cdk-accordion, [cdkAccordion]',
	exportAs: 'cdkAccordion'
})
export class CdkAccordion {
	readonly id = `cdk-accordion-${nextId++}`

	@Input()
	get multi(): boolean { return this._multi }
	set multi(multi: boolean) { this._multi = coerceBooleanProperty(multi) }
	private _multi: boolean = false
}
