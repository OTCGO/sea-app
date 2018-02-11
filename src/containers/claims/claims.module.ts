import { NgModule } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'
import { ClaimsPage } from './claims'

@NgModule({
	declarations: [ClaimsPage],
	imports: [IonicPageModule.forChild(ClaimsPage)],
	exports: [ClaimsPage]
})
export class ClaimsPageModule {}