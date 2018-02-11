import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams } from 'ionic-angular'
import { ManageWalletPage } from './manage-wallet/manage-wallet'
import { PossessionsProvider } from '../possessions/possessions.provider'
import { SettingsPage } from './settings/settings'

@IonicPage({
  name: 'Profile',
  segment: 'profile'
})
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',

})
export class ProfilePage {
  account = this.possessionsProvider.getAccount()
  manageWalletPage = ManageWalletPage
  settingsPage = SettingsPage

  constructor (
      public navCtrl: NavController,
      public navParams: NavParams,
      private possessionsProvider: PossessionsProvider
  ) {}

}
