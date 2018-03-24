import { SendModalComponent } from './send-modal'
import { NgModule } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'


const COMPONENTS = [
  SendModalComponent
]

@NgModule({
  declarations: COMPONENTS,
  imports: [
    IonicPageModule.forChild(SendModalComponent)
  ],
  exports: COMPONENTS
})
export class SendModalModule {}
