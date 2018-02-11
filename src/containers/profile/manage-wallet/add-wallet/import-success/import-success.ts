import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';

import { WalletProvider } from "../../../../../providers/wallet/wallet.provider";
import { ManageWalletPage } from '../../manage-wallet'

@IonicPage()
@Component({
  selector: 'page-import-success',
  templateUrl: 'import-success.html',

})
export class ImportSuccessPage {
  manageWalletPage = ManageWalletPage
  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
      private walletProvider: WalletProvider,
      public alertCtrl: AlertController
    ) {
  }

}
