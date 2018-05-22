import { NgModule } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'
import { ProfilePage } from './profile'
import { TranslateModule } from '@ngx-translate/core'
import { ProfileRoundMenuComponent } from '../../components/profile/profile-round-menu'
import { ProfileNavComponent } from '../../components/profile/profile-nav'
import { ProfileFeatureListComponent } from '../../components/profile/profile-feature-list'

const COMPONENTS = [
	ProfilePage,
	ProfileNavComponent,
	ProfileRoundMenuComponent,
	ProfileFeatureListComponent
]

@NgModule({
	declarations: COMPONENTS,
	imports: [
		IonicPageModule.forChild(ProfilePage),
		TranslateModule.forChild()
	]
})
export class ProfilePageModule {}
