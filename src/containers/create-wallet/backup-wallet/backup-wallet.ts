import { Component } from '@angular/core'
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
  constructor (private navCtrl: NavController) {}

  openHome () {
    this.navCtrl.setRoot('Tabs')
  }
}
