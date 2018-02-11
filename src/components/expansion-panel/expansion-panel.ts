import { AnimationEvent } from '@angular/animations'
import {
	AfterContentInit, ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	ContentChild,
	Directive,
	Host,
	Input,
	OnChanges,
	OnDestroy,
	Optional,
	SimpleChanges,
	ViewContainerRef
} from '@angular/core'

import { Subject } from 'rxjs/Subject'
import { filter, startWith, take } from 'rxjs/operators'

import { Accordion } from './accordion'
import { coerceBooleanProperty } from '../core/cdk/coercion/boolean-property'
import { UniqueSelectionDispatcher } from '../core/cdk/collections/unique-selection-dispatcher'
import { CdkAccordionItem } from '../core/cdk/accordion/accordion-item'
import { TemplatePortal } from '../core/cdk/portal'
import { ExpansionPanelContent } from './expansion-panel-content'
import { ExpansionAnimations } from './expansion-animations'

export type ExpansionPanelState = 'expanded' | 'collapsed'

let uniqueId = 0

@Component({
	selector: 'expansion-panel',
	templateUrl: 'expansion-panel.html',
	preserveWhitespaces: false,
	changeDetection: ChangeDetectionStrategy.OnPush,
	inputs: ['disabled', 'expanded'],
	outputs: ['opened', 'closed', 'expandedChange'],
	animations: [ExpansionAnimations.bodyExpansion],
	host: {
		'class': 'expansion-panel',
		'[class.expanded]': 'expanded',
		'[class.expansion-panel-spacing]': '_hasSpacing()'
	}
})
export class ExpansionPanel extends CdkAccordionItem
	implements AfterContentInit, OnChanges, OnDestroy {

	@Input()
	get hideToggle (): boolean { return this._hideToggle }

	set hideToggle (hideToggle: boolean) { this._hideToggle = coerceBooleanProperty(hideToggle) }

	private _hideToggle: boolean = false

	readonly _inputChanges = new Subject<SimpleChanges>()

	@ContentChild(ExpansionPanelContent) _lazyContent: ExpansionPanelContent

	_portal: TemplatePortal

	_headerId = `expansion-panel-header-${uniqueId++}`

	constructor (
		@Optional() @Host() public accordion: Accordion,
		_changeDetectorRef: ChangeDetectorRef,
		_uniqueSelectionDispatcher: UniqueSelectionDispatcher,
		private _viewContainerRef: ViewContainerRef
	) {
		super(accordion, _changeDetectorRef, _uniqueSelectionDispatcher)
	}

	_getHideToggle (): boolean {
		if (this.accordion)
			return this.accordion.hideToggle
		return this.hideToggle
	}

	_hasSpacing (): boolean {
		if (this.accordion)
			return (this.expanded ? this.accordion.displayMode : this._getExpandedState()) === 'default'
		return false
	}

	_getExpandedState (): ExpansionPanelState {
		return this.expanded ? 'expanded' : 'collapsed'
	}

	ngAfterContentInit () {
		if (this._lazyContent)
			this.opened.pipe(
				startWith(null!),
				filter(() => this.expanded && !this._portal),
				take(1)
			).subscribe(() => this._portal = new TemplatePortal(this._lazyContent.template, this._viewContainerRef))
	}

	ngOnChanges (changes: SimpleChanges) {
		this._inputChanges.next(changes)
	}

	_bodyAnimation (event: AnimationEvent) {
		const classList = event.element.classList
		const cssClass = 'expanded'
		const { phaseName, toState } = event

		if (phaseName === 'done' && toState === 'expanded')
			classList.add(cssClass)
		else if (phaseName === 'start' && toState === 'collapsed')
			classList.remove(cssClass)
	}

}

@Directive({
	selector: 'action-row',
	host: {
		'class': 'action-row'
	}
})
export class ExpansionPanelActionRow {}
