import { NgModule } from '@angular/core'
import { PossessionsPage } from './possessions'
import { IonicPageModule } from 'ionic-angular'
import { PipesModule } from '../../pipes/pipes.module'
import { TranslateModule } from '@ngx-translate/core'
import { PossessionsInfoComponent } from '../../components/possessions/possessions-info'
import { PossessionsListComponent } from '../../components/possessions/possessions-list'

const COMPONENTS = [
	PossessionsPage,
	PossessionsInfoComponent,
	PossessionsListComponent
]

@NgModule({
	imports: [
		IonicPageModule.forChild(PossessionsPage),
		TranslateModule.forChild(),
		PipesModule
	],
	declarations: COMPONENTS
})
export class PossessionsPageModule {}
