import { NgModule } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'

import { Helpcentre } from './helpcentre'

@NgModule({
	imports: [
		IonicPageModule.forChild(Helpcentre)
	],
	declarations: [Helpcentre]
})
export class HelpcentreModule { }
