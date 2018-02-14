import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams } from 'ionic-angular'
import { ManageWalletPage } from './manage-wallet/manage-wallet'
import { SettingsPage } from './settings/settings'
import { WalletProvider } from '../../providers'

@IonicPage({
  name: 'Profile',
  segment: 'profile'
})
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',

})
export class ProfilePage {
  account = this.walletProvider.getDefaultAccount()
  manageWalletPage = ManageWalletPage
  settingsPage = SettingsPage

  constructor (
      public navCtrl: NavController,
      public navParams: NavParams,
      private walletProvider: WalletProvider
  ) {}

}
