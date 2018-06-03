import { Component, Input } from '@angular/core'

@Component({
	selector: 'timeline',
	template: `
	  <ion-row class="timeline">
		  <ion-grid>
			  <ng-content></ng-content>
			  <ng-template *ngIf="showEnd">
				  <timeline-item>
					  <ion-col col-2>
						  <ion-icon></ion-icon>
					  </ion-col>
				  </timeline-item>
			  </ng-template>
		  </ion-grid>
	  </ion-row>
	`
})
export class TimelineComponent {
	// @Input('end') endIcon = 'ionic'
	@Input() showEnd = false
}

// Timeline-item
@Component({
	selector: 'timeline-item',
	template: `
	  <ng-content></ng-content>`
})
export class TimelineItemComponent {
}

// Timeline-time
@Component({
	selector: 'timeline-time',
	template: '<span>{{subtitle}}</span> <span>{{title}}</span>'
})
export class TimelineTimeComponent {
	@Input() time: string

	get subtitle () {
		return this.time.split(' ')[0]
	}

	get title () {
		return this.time.split(' ')[1]
	}

	constructor () { }
}
