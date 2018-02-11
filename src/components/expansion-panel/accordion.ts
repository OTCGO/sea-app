import { Directive, Input } from '@angular/core'
import { CdkAccordion } from '../core/cdk/accordion/accordion'
import { coerceBooleanProperty } from '../core/cdk/coercion/boolean-property'

export type AccordionDisplayMode = 'default' | 'flat'

@Directive({
	selector: 'accordion',
	exportAs: 'matAccordion',
	host: {
		'class': 'accordion'
	}
})
export class Accordion extends CdkAccordion {
	/** Whether the expansion indicator should be hidden. */
	@Input()
	get hideToggle(): boolean { return this._hideToggle }
	set hideToggle(hideToggle: boolean) { this._hideToggle = coerceBooleanProperty(hideToggle) }
	private _hideToggle: boolean = false

	/**
	 * The display mode used for all expansion panels in the accordion. Currently two display
	 * modes exist:
	 *   default - a gutter-like spacing is placed around any expanded panel, placing the expanded
	 *     panel at a different elevation from the reset of the accordion.
	 *  flat - no spacing is placed around expanded panels, showing all panels at the same
	 *     elevation.
	 */
	@Input() displayMode: AccordionDisplayMode = 'default'
}