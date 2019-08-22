import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MenuService } from '../../../shared/services'

/**
 * Generated class for the NodeStatusPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'NodeStatus',
  segment: 'status'
})
@Component({
  selector: 'page-node-status',
  templateUrl: 'node-status.html',
})
export class NodeStatusPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private menuService: MenuService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NodeStatusPage');
  }

  gotoUnlock() {
    this.navCtrl.push("NodeUnlock")
  }

  handleMenu() {
    this.menuService.sendMessage("change")
  }
}
