import { NgModule } from '@angular/core'
import { StoreModule } from '@ngrx/store'
import { IonicPageModule } from 'ionic-angular'
import { ClaimsPage } from './claims'
import { reducers } from './reducers'

@NgModule({
	declarations: [ClaimsPage],
	imports: [
		IonicPageModule.forChild(ClaimsPage),
		StoreModule.forFeature('counter-feature', reducers),
	],
	exports: [ClaimsPage]
})
export class ClaimsPageModule {}