import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	Directive,
	ElementRef,
	Host,
	Input,
	OnDestroy,
} from '@angular/core'

import { Subscription } from 'rxjs/Subscription'
import { filter } from 'rxjs/operators/filter'
import { merge } from 'rxjs/observable/merge'
import { ENTER, SPACE } from '../core/cdk/keycodes'
import { ExpansionPanel } from './expansion-panel'
import { ExpansionAnimations } from './expansion-animations'

@Component({
	selector: 'expansion-panel-header',
	templateUrl: 'expansion-panel-header.html',
	preserveWhitespaces: false,
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: [
		ExpansionAnimations.indicatorRotate,
		ExpansionAnimations.expansionHeaderHeight
	],
	host: {
		'class': 'expansion-panel-header',
		'role': 'button',
		'[attr.id]': 'panel._headerId',
		'[attr.tabindex]': 'panel.disabled ? -1 : 0',
		'[attr.aria-controls]': '_getPanelId()',
		'[attr.aria-expanded]': '_isExpanded()',
		'[attr.aria-disabled]': 'panel.disabled',
		'[class.mat-expanded]': '_isExpanded()',
		'(click)': '_toggle()',
		'(keydown)': '_keydown($event)',
		'[@expansionHeight]': `{
        value: _getExpandedState(),
        params: {
          collapsedHeight: collapsedHeight,
          expandedHeight: expandedHeight
        }
    }`,
	}
})
export class ExpansionPanelHeader implements OnDestroy {
	private _parentChangeSubscription = Subscription.EMPTY

	constructor (
		@Host() public panel: ExpansionPanel,
		private _element: ElementRef,
		private _changeDetectorRef: ChangeDetectorRef
	) {
		this._parentChangeSubscription = merge(
			panel.opened,
			panel.closed,
			panel._inputChanges.pipe(filter(changes => !!(changes.hideToggle || changes.disabled)))
		)
		.subscribe(() => this._changeDetectorRef.markForCheck())
	}

	@Input() expandedHeight: string

	@Input() collapsedHeight: string

	_toggle ():void {
		this.panel.toggle()
	}

	_isExpanded (): boolean {
		return this.panel.expanded
	}

	_getExpandedState (): string {
		return this.panel._getExpandedState()
	}

	_getPanelId (): string {
		return this.panel.id
	}

	_showToggle (): boolean {
		return !this.panel.hideToggle && !this.panel.disabled
	}

	_keydown (event: KeyboardEvent) {
		switch (event.keyCode) {
			case SPACE:
			case ENTER:
				event.preventDefault()
				this._toggle()
			default:
				return
		}
	}

	ngOnDestroy () {
		this._parentChangeSubscription.unsubscribe()
	}
}

@Directive({
	selector: 'panel-description',
	host: {
		'class': 'expansion-panel-header-description'
	}
})
export class ExpansionPanelDescription {}

@Directive({
	selector: 'panel-title',
	host: {
		'class': 'expansion-panel-header-title'
	}
})
export class ExpansionPanelTitle {}
