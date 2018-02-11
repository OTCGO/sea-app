import { NgModule } from '@angular/core'
import { ObservationModePage } from './observation-mode'
import { IonicPageModule } from 'ionic-angular'

@NgModule({
	declarations: [ObservationModePage],
	imports: [IonicPageModule.forChild(ObservationModePage)],
	exports: [ObservationModePage]
})
export class ObservationModePageModule {}
