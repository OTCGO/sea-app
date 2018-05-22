import { NgModule } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'

import { Notification } from './notification'

@NgModule({
	imports: [
		IonicPageModule.forChild(Notification)
	],
	declarations: [
		Notification
	]
})
export class NotificationModule {}
