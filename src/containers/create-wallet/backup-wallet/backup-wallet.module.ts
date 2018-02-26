import { NgModule } from '@angular/core'
import { BackupWalletPage } from './backup-wallet'
import { IonicPageModule } from 'ionic-angular'
import { TranslateModule } from '@ngx-translate/core'

const COMPONENTS = [
  BackupWalletPage
]

@NgModule({
  imports: [
    TranslateModule.forChild(),
    IonicPageModule.forChild(BackupWalletPage)
  ],
  declarations: COMPONENTS,
  entryComponents: COMPONENTS
})
export class BackupWalletModule {}
