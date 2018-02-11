import { Component, Input } from '@angular/core'

@Component({
  selector: 'timeline',
  template: `
	  <ion-row class="timeline">
      <ion-grid>
	      <ng-content></ng-content>
      </ion-grid>
	  </ion-row>    
  `
})
export class TimelineComponent {
  @Input('end') endIcon = 'ionic'
}


// Timeline-item
@Component({
  selector: 'timeline-item',
  template: `<ng-content></ng-content>`
})
export class TimelineItemComponent {}


// Timeline-time
@Component({
  selector:'timeline-time',
  template: '<span>{{time.subtitle}}</span> <span>{{time.title}}</span>'
})
export class TimelineTimeComponent{
  @Input('time') time: { title?: string, subtitle?: string} = {}
}
