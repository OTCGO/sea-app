import { NgModule } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'
import { ProfilePage } from './profile'
import { TranslateModule } from '@ngx-translate/core'

const COMPONENTS = [
	ProfilePage
]

@NgModule({
	declarations: COMPONENTS,
	imports: [
		TranslateModule.forChild(),
		IonicPageModule.forChild(ProfilePage)
	],
	exports: COMPONENTS
})
export class ProfilePageModule {}
