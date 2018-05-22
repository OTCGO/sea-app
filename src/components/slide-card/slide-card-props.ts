import { EventEmitter, Input, Output } from '@angular/core'

export class SlideCardProps {
  @Input() height: string
  @Input() trigger = 'hover'
  @Input() interval = 3000
  @Input() autoplay = false
  @Input() indicator = true

  @Input() type = 'card'
  @Input() arrow = 'hover'

  @Input() initialIndex = 0
  @Input() indicatorPosition: string

  @Output() change = new EventEmitter()
}
