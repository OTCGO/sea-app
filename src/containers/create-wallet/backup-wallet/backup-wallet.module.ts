import { NgModule } from '@angular/core'
import { BackupWalletPage } from './backup-wallet'
import { IonicPageModule } from 'ionic-angular'

const COMPONENTS = [
  BackupWalletPage
]

@NgModule({
  imports: [
    IonicPageModule.forChild(BackupWalletPage)
  ],
  declarations: COMPONENTS,
  entryComponents: COMPONENTS
})
export class BackupWalletModule {}
