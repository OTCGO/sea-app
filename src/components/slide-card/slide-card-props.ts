import { EventEmitter, Input, Output } from '@angular/core'

export class SlideCardProps {
  @Input() height: string
  @Input() trigger: string = 'hover'
  @Input() interval: number = 3000
  @Input() autoplay: boolean = false
  @Input() indicator: boolean = true

  @Input() type: string = 'card'
  @Input() arrow: string = 'hover'

  @Input() initialIndex: number = 0
  @Input() indicatorPosition: string

  @Output() change = new EventEmitter()
}