import { Component, Input, OnInit } from '@angular/core';
import { MenuService } from '../../shared/services'
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the NodeHeaderComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'node-header',
  templateUrl: 'node-header.html'
})
export class NodeHeaderComponent implements OnInit {

  @Input() title: string;
  constructor(private menuService: MenuService, public navCtrl: NavController, ) {

  }

  ngOnInit() {
    console.log('this.navCtrl.length', this.navCtrl.length())

  }

  ionViewDidEnter() {
    // console.log('ionViewDidEnter:this.navCtrl.length', this.navCtrl.length())
  }



  handleMenu() {
    console.log('handleMenu')
    this.menuService.sendMessage("change")
  }
}
