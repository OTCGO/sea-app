import { NgModule } from '@angular/core'
import { OnboardingPage } from './onboarding'
import { IonicPageModule } from 'ionic-angular'

@NgModule({
	declarations: [OnboardingPage],
	imports: [IonicPageModule.forChild(OnboardingPage)],
	exports: [OnboardingPage]
})
export class OnboardingPageModule {}
