import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MenuService } from '../../../shared/services'

/**
 * Generated class for the NodeUnlockPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'NodeUnlock',
  segment: 'unlock'
})
@Component({
  selector: 'page-node-unlock',
  templateUrl: 'node-unlock.html',
})
export class NodeUnlockPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private menuService: MenuService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NodeUnlockPage');
  }

  handleMenu() {
    this.menuService.sendMessage("change")
  }

}
