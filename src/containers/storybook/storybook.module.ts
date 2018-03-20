import { NgModule } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'
import { ManageWalletCards } from '../../components/profile/manage-wallet'
import { ManageWalletPlay } from './manage-wallet.play'
import { Storybook } from './storybook'

console.dir(ManageWalletCards)

@NgModule({
	declarations: [
		Storybook,
		ManageWalletPlay,
		ManageWalletCards
	],
	imports: [
		IonicPageModule.forChild(Storybook)
	]
})
export class StoryBookModule {}
