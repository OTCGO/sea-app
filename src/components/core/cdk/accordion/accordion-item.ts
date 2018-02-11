import { ChangeDetectorRef, Directive, EventEmitter, Input, OnDestroy, Optional, Output } from '@angular/core'
import { CdkAccordion } from './accordion'
import { UniqueSelectionDispatcher } from '../collections/unique-selection-dispatcher'
import { coerceBooleanProperty } from '../coercion/boolean-property'

let nextId = 0

@Directive({
	selector: 'cdk-accordion-item',
	exportAs: 'CdkAccordionItem'
})
export class CdkAccordionItem implements OnDestroy {

	@Output() closed: EventEmitter<void> = new EventEmitter<void>()

	@Output() opened: EventEmitter<void> = new EventEmitter<void>()

	@Output() destroyed: EventEmitter<void> = new EventEmitter<void>()

	@Output() expandedChange: EventEmitter<boolean> = new EventEmitter<boolean>()

	readonly id = `cdk-accordion-child-${nextId++}`

	@Input()
	get expanded(): any { return this._expanded }
	set expanded(expanded: any) {
		expanded = coerceBooleanProperty(expanded)

		if (this._expanded !== expanded) {
			this._expanded = expanded
			this.expandedChange.emit()

			if (expanded) {
				this.opened.emit()

				const accordionId = this.accordion ? this.accordion.id : this.id
				this._expansionDispatcher.notify(this.id, accordionId)
			} else {
				this.closed.emit()
			}
		}

		this._changeDetectorRef.markForCheck()
	}
	private _expanded: any = false

	@Input()
	get disabled(): boolean { return this._disabled }
	set disabled(disabled: boolean) { this._disabled = coerceBooleanProperty(disabled) }
	private _disabled: boolean = false

	private _removeUniqueSelectionListener: () => void = () => {}

	constructor (@Optional() public accordion: CdkAccordion,
	             private _changeDetectorRef: ChangeDetectorRef,
	             protected _expansionDispatcher: UniqueSelectionDispatcher) {
		this._removeUniqueSelectionListener =
			_expansionDispatcher.listen((id: string, accordionId: string): void => {
				if (this.accordion && !this.accordion.multi &&
						this.accordion.id === accordionId && this.id !== id)
					this.expanded = false
			})
	}

	ngOnDestroy () {
		this.destroyed.emit()
		this._removeUniqueSelectionListener()
	}

	toggle (): void {
		if (!this.disabled) this.expanded = !this.expanded
	}

	close (): void {
		if (!this.disabled) this.expanded = false
	}

	open (): void {
		if (!this.disabled) this.expanded = true
	}
}
