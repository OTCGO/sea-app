import {
	AfterContentInit,
	Component,
	forwardRef,
	Inject,
	Input,
	OnDestroy
} from '@angular/core'
import { SlideCard } from './slide-card'

const CARD_SCALE = 0.83

@Component({
	selector: 'slide-card-item',
	templateUrl: 'slide-card-item.html',
})
export class SlideCardItem implements AfterContentInit, OnDestroy {
	@Input() label: string | number = ''
	@Input('header') header: string
	@Input() name = 'SlideCardItem'

	get itemTranslateStyle () {
		return {
			msTransform: `translateX(${ this.translate }px) scale(${ this.scale })`,
			webkitTransform: `translateX(${ this.translate }px) scale(${ this.scale })`,
			transform: `translateX(${ this.translate }px) scale(${ this.scale })`
		}
	}

	get parentWidth (): number | null {
		return this.parent.el.nativeElement.offsetWidth
	}

	hover = false
	translate = 0
	scale = 1
	isActive = false
	ready = false
	inStage = false
	animating = false

	constructor (
		@Inject(forwardRef(() => SlideCard)) public parent: SlideCard
	) {}

	ngAfterContentInit () {
		this.parent && this.parent.updateItems()
	}

	ngOnDestroy () {
		this.parent && this.parent.updateItems()
	}

	proceessIndex (index, activeIndex, length) {
		if (activeIndex === 0 && index === length - 1) return -1
		else if (activeIndex === length - 1 && index === 0) return length
		else if (index < activeIndex - 1 && activeIndex - index >= length / 2) return length + 1
		else if (index > activeIndex + 1 && index - activeIndex >= length / 2) return -2
		return index
	}

	calculateTranslate (index, activeIndex, parentWidth) {
		if (this.inStage) return parentWidth * ((2 - CARD_SCALE) * (index - activeIndex) + 1) / 8 - 18
		else if (index < activeIndex) return -(1 + CARD_SCALE) * parentWidth / 8 - 18
		return (3 + CARD_SCALE) * parentWidth / 8 - 18
	}

	translateItem (index, activeIndex, oldIndex) {
		const parentWidth = this.parentWidth
		const length = this.parent.items.length
		if (this.parent.type !== 'card' && typeof oldIndex !== 'undefined') {
			this.animating = index === activeIndex || index === oldIndex
		}
		if (index !== activeIndex && length > 2) {
			index = this.proceessIndex(index, activeIndex, length)
		}
		if (this.parent.type === 'card') {
			this.inStage = Math.round(Math.abs(index - activeIndex)) <= 1
			this.isActive = index === activeIndex
			this.translate = this.calculateTranslate(index, activeIndex, parentWidth)
			this.scale = this.isActive ? 1 : CARD_SCALE
		} else {
			this.isActive = index === activeIndex
			this.translate = parentWidth * (index - activeIndex)
		}
		this.ready = true
	}

	handleItemClick () {
		const parent = this.parent
		if (parent && parent.type === 'card') {
			const index = parent.items.indexOf(this)
			parent.setActiveItem(index)
		}
	}

}
