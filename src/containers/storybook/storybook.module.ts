import { NgModule } from '@angular/core'
import { TranslateModule } from '@ngx-translate/core'
import { IonicPageModule } from 'ionic-angular'
import {
	ManageWalletCard,
	ManageWalletCards,
} from '../../components/profile/manage-wallet'
import { ManageWalletPlay } from './manage-wallet.play'
import { Storybook } from './storybook'


@NgModule({
	declarations: [
		Storybook,
		ManageWalletPlay,
		ManageWalletCards,
		ManageWalletCard
	],
	imports: [
		TranslateModule.forChild(),
		IonicPageModule.forChild(Storybook)
	],
})
export class StoryBookModule {}
