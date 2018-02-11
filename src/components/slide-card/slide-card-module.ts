import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SlideCard } from './slide-card'
import { SlideCardItem } from './slide-card-item'
import { StopPropagationDirective } from '../directives'

const COMPONENTS = [
	SlideCard,
	SlideCardItem,
	StopPropagationDirective
]

@NgModule({
	imports: [CommonModule],
	declarations: COMPONENTS,
	exports: COMPONENTS
})
export class SlideCardModule {
}
