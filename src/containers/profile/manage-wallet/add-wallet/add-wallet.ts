import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CreateWalletPage } from '../../../create-wallet/create-wallet';

import { ImportFilePage } from './import-file/import-file';
import { ImportPrivateKeyPage } from './import-private-key/import-private-key'
import { ObservationModePage } from './observation-mode/observation-mode';

/**
 * Generated class for the DiscoverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'AddWallet'
})
@Component({
  selector: 'page-add-wallet',
  templateUrl: 'add-wallet.html',
})
export class AddWalletPage {
  user: object;
  createWalletPage = CreateWalletPage;
  menuList =  [
    {title: '导入钱包文件', pageName: ImportFilePage},
    {title: '私钥导入', pageName: ImportPrivateKeyPage},
    {title: '观察模式', pageName: ObservationModePage}
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddWalletPage');
  }

  menuSelected(pageName) {
    this.navCtrl.push(pageName);
  }
}
