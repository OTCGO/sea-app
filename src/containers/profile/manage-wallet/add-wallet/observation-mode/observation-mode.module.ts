import { NgModule } from '@angular/core'
import { TranslateModule } from '@ngx-translate/core'
import { IonicPageModule } from 'ionic-angular'
import { ObservationModePage } from './observation-mode'


@NgModule({
	declarations: [ObservationModePage],
	imports: [
		IonicPageModule.forChild(ObservationModePage),
		TranslateModule.forChild()
	],
	exports: [ObservationModePage]
})
export class ObservationModePageModule {}
