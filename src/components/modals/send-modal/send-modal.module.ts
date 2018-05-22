import { TranslateModule } from '@ngx-translate/core'
import { SendModalComponent } from './send-modal'
import { NgModule } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'


const COMPONENTS = [
  SendModalComponent
]

@NgModule({
  declarations: COMPONENTS,
  imports: [
		TranslateModule.forChild(),
    IonicPageModule.forChild(SendModalComponent),
  ],
  exports: COMPONENTS
})
export class SendModalModule {}
