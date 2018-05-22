import { Directive, ElementRef, EventEmitter, OnDestroy, OnInit, Output, Renderer2 } from '@angular/core'

@Directive({
  selector: '[abort.stop], [beforeinput.stop], [blur.stop], [click.stop], [compositionstart.stop], [compositionupdate.stop], [compositionend.stop], [dblclick.stop], [error.stop], [focus.stop], [focusin.stop], [focusout.stop], [input.stop], [keydown.stop], [keypress.stop], [keyup.stop], [load.stop], [mousedown.stop], [mouseenter.stop], [mouseleave.stop], [mousemove.stop], [mouseout.stop], [mouseover.stop], [mouseup.stop], [resize.stop], [scroll.stop], [select.stop], [unload.stop], [wheel.stop]'
})
export class StopPropagationDirective implements OnInit, OnDestroy {
  clickUnSubscriber
  monseEnterSubscriber
  @Output('click.stop') clickStopPropEvent = new EventEmitter()
  @Output('monseenter.stop') monseEnterStopPropEvent = new EventEmitter()

  constructor (private renderer: Renderer2, private element: ElementRef) { }

  ngOnInit () {
    this.clickUnSubscriber = this.renderer.listen(this.element.nativeElement, 'click', event => {
      event.stopPropagation()
      this.clickStopPropEvent.emit(event)
    })

    this.monseEnterSubscriber = this.renderer.listen(this.element.nativeElement, 'mouseenter', event => {
      event.stopPropagation()
      this.monseEnterStopPropEvent.emit(event)
    })
  }

  ngOnDestroy () {
    this.clickUnSubscriber()
  }
}
