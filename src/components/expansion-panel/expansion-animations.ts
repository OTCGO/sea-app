import { animate, AnimationTriggerMetadata, state, style, transition, trigger } from '@angular/animations'

export const EXPANSION_PANEL_ANIMATION_TIMING = '225ms cubic-bezier(0.4,0.0,0.2,1)'

export const ExpansionAnimations: {
	readonly indicatorRotate: AnimationTriggerMetadata
	readonly expansionHeaderHeight: AnimationTriggerMetadata
	readonly bodyExpansion: AnimationTriggerMetadata
} = {

	indicatorRotate: trigger('indicatorRotate', [
		state('collapsed', style({transform: 'rotate(0deg)'})),
	  state('expanded', style({transform: 'rotate(180deg)'})),
	  transition('expanded <=> collapsed', animate(EXPANSION_PANEL_ANIMATION_TIMING))
	]),

	expansionHeaderHeight: trigger('expansionHeight', [
		state('collapsed', style({
			height: '{{collapsedHeight}}'
		}), {
			params: {collapsedHeight: '48px'}
		}),
	  state('expanded', style({
		  height: '{{expandedHeight}}'
	  }), {
	  	params: {expandedHeight: '64px'}
	  }),
	  transition('expanded <=> collapsed', animate(EXPANSION_PANEL_ANIMATION_TIMING))
	]),

	bodyExpansion: trigger('bodyExpansion', [
		state('collapsed', style({height: '0', visibility: 'hidden'})),
	  state('expanded', style({height: '*', visibility: 'visible'})),
	  transition('expanded <=> collapsed', animate(EXPANSION_PANEL_ANIMATION_TIMING))
	])
}
