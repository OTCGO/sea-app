import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MenuService } from '../../../shared/services'

/**
 * Generated class for the NodePickPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'NodePick',
  segment: 'pick'
})
@Component({
  selector: 'page-node-pick',
  templateUrl: 'node-pick.html',
})
export class NodePickPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private menuService: MenuService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NodePickPage');
  }

  handleMenu() {
    console.log('handleMenu')
    this.menuService.sendMessage("change")
  }
}
