import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MenuService } from '../../../shared/services'

/**
 * Generated class for the NodePostPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'NodePost',
  segment: 'post'
})
@Component({
  selector: 'page-node-post',
  templateUrl: 'node-post.html',
})
export class NodePostPage {

  private isShare: boolean

  constructor(public navCtrl: NavController, public navParams: NavParams, private menuService: MenuService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NodePostPage');
  }

  handleMenu() {
    this.menuService.sendMessage("change")
  }

  openShare() {
    this.isShare = true;
  }

  closeShare() {
    this.isShare = false;
  }

}
