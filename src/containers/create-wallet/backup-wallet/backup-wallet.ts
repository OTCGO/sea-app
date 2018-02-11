import { Component } from '@angular/core'
import { TabsPage } from '../../tabs/tabs'
import { IonicPage, NavController } from 'ionic-angular'

@IonicPage({
  name: 'BackupWallet',
  segment: 'backup-wallet'
})
@Component({
  selector: 'page-backup-wallet',
  templateUrl: 'backup-wallet.html',
})
export class BackupWalletPage {
  tabsPage = TabsPage

  constructor (private navCtrl: NavController) {}

  openHome () {
    this.navCtrl.setRoot(this.tabsPage)
  }
}