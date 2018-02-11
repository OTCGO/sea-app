import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { WalletProvider } from "../../../../../providers/wallet/wallet.provider";

@IonicPage()
@Component({
  selector: 'page-import-private-key',
  templateUrl: 'import-private-key.html',
})
export class ImportPrivateKeyPage {
    private _file: File;
    importText: string = "导入钱包文件";
    isWIFKey: boolean = true;
    WIFKey: string
    passphrase: string

  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
      private walletProvider: WalletProvider,
      public alertCtrl: AlertController
    ) {
  }

  scanCode() {
      
  }
  doImport() {
      
  }
}
