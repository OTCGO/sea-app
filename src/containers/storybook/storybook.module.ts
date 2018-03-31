import { NgModule } from '@angular/core'
import { TranslateModule } from '@ngx-translate/core'
import { IonicPageModule } from 'ionic-angular'

import { Storybook } from './storybook'


@NgModule({
	declarations: [
		Storybook,
	],
	imports: [
		TranslateModule.forChild(),
		IonicPageModule.forChild(Storybook)
	],
})
export class StoryBookModule {}
