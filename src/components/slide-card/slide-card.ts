import {
  Component,
  ContentChildren, ElementRef,
  forwardRef,
  QueryList
} from '@angular/core'

import { SlideCardProps } from './slide-card-props'
import { SlideCardItem } from './slide-card-item'

import { Observable } from 'rxjs/Observable'
import { Subject } from 'rxjs/Subject'
import { interval } from 'rxjs/observable/interval'
import 'rxjs/add/operator/throttle'
import { addResizeListener } from '../core/utils/resize-event'


@Component({
  selector: 'slide-card',
  templateUrl: 'slide-card.html',
})
export class SlideCard extends SlideCardProps {

  @ContentChildren(forwardRef(() => SlideCardItem)) children: QueryList<SlideCardItem>
  timer: any


  throttledArrowClick$: Observable<number> = new Subject<number>()
  throttledIndicatorHover$: Observable<MouseEvent> = new Subject<MouseEvent>()

  constructor (public el: ElementRef) {
    super()
  }

  containerWidth = 0
  time = null

  hover: boolean = false

  private _items = []
  get items() {
    return this._items
  }
  set items(val) {
    if (val.length > 0) this.setActiveItem(this.initialIndex)
    this._items = val
  }


  private _activeIndex = -1
  get activeIndex() {
    return this._activeIndex
  }
  set activeIndex(val) {
    const oldVal = this._activeIndex
    this._activeIndex = val
    this.resetItemPosition(oldVal)
    this.change.emit({ newVal: val, oldVal })
  }

  get hasLabel () {
    return this.items.some(item => item.label.toString().length > 0)
  }

  /* TODO: To break down this component logic this func is what u are going to looking up */
  itemInStage (item, index) {
    const length = this.items.length
    if (index === length - 1 && item.inStage && this.items[0].active ||
      (item.inStage && this.items[index + 1] && this.items[index + 1].active)) {
      return 'left'
    } else if (index === 0 && item.inStage && this.items[length - 1].active ||
      (item.inStage && this.items[index - 1] && this.items[index - 1].active)) {
      return 'right'
    }
    return false
  }

  handleButtonEnter (arrow) {
    this.items.forEach((item, index) => {
      if (arrow === this.itemInStage(item, index)) {
        item.hover = true
      }
    })
  }

  handleButtonLeave () {
    this.items.forEach(item => {
      item.hover = false
    })
  }

  updateItems () {

    // this.items = this.children.filter(child => child.name === 'SlideCardItem')
  }

  resetItemPosition (oldIndex) {
    this.items.forEach((item, index) => {
      item.translateItem(index, this.activeIndex, oldIndex)
    })
  }

  playSlides () {
    if (this.activeIndex < this.items.length - 1) {
      this.activeIndex++;
    } else {
      this.activeIndex = 0;
    }
  }

  pauseTimer () {
    window.clearInterval.call(this, this.timer)
  }

  startTimer () {
    if (this.interval <= 0 || !this.autoplay) return
    this.timer = window.setInterval(this.playSlides.bind(this), this.interval)
  }

  setActiveItem (index) {
    if (typeof index === 'string') {
      const filteredItems = this.items.filter(item => item.name === index)
      if (filteredItems.length > 0) index = this.items.indexOf(filteredItems[0])
    }
    index = Number(index)
    if (isNaN(index) || index !== Math.floor(index)) return

    const length = this.items.length
    const oldIndex = this.activeIndex

    if (index < 0)
      this.activeIndex = length - 1
    else if (index >= length)
      this.activeIndex = 0
    else
      this.activeIndex = index

    if (oldIndex === this.activeIndex) this.resetItemPosition(oldIndex)
  }

  handleIndicatorClick (index) {
    this.activeIndex = index
  }

  handleIndicatorHover (index) {
    if (this.trigger === 'hover' && index !== this.activeIndex)
      this.activeIndex = index
  }

  handleMouse (bool: boolean) {
    this.hover = bool
    if (bool)
      this.pauseTimer()
    else
      this.startTimer()
  }

  ngOnChanges () {
    addResizeListener(this.el.nativeElement.querySelector('.m-carousel'), this.resetItemPosition.bind(this))
    if (this.initialIndex < this.items.length && this.initialIndex >= 0)
      this.activeIndex = this.initialIndex
    this.startTimer()
  }

  /* TODO: try out using the ngOnChanges strategy */

  ngOnInit () {
    this.throttledArrowClick$.throttle(ev => interval(300)).subscribe(this.setActiveItem.bind(this))
    this.throttledIndicatorHover$.throttle(ev => interval(300)).subscribe(this.handleIndicatorHover.bind(this))
  }

  ngAfterViewInit () {
    this.items = this.children.map(i => i)
    this.ngOnChanges()
  }

  ngOnDestroy () {
    this.el.nativeElement && this.pauseTimer()
  }
}