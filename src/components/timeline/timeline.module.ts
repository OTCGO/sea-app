import { NgModule } from '@angular/core'
import { IonicModule } from 'ionic-angular'
import {
  TimelineComponent,
  TimelineItemComponent,
  TimelineTimeComponent
} from './timeline'

const COMPONENTS = [
  TimelineComponent,
  TimelineItemComponent,
  TimelineTimeComponent
]

// TODO(Amagi): Using IonicModule may be become a huge cost right there, Optimize later
@NgModule({
  declarations: COMPONENTS,
  imports: [IonicModule],
  exports: COMPONENTS
})
export class TimelineModule {}
