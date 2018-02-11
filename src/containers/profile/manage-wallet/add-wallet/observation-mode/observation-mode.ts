import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';


import { WalletProvider } from "../../../../../providers/wallet/wallet.provider";
import { ImportSuccessPage } from '../import-success/import-success'

@IonicPage()
@Component({
  selector: 'page-observation',
  templateUrl: 'observation-mode.html',
})
export class ObservationModePage {
    private _file: File;
    importText: string = "导入钱包文件";
    isWIFKey: boolean = false;
    WIFKey: string
    passphrase: string

  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
      private walletProvider: WalletProvider,
      public alertCtrl: AlertController
    ) {
  }

  doImport() {
      this.navCtrl.push(ImportSuccessPage);
  }
}
