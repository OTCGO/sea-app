import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the NodeRulePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'Contact',
  segment: 'contact'
})
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
})
export class ContactPage implements OnInit {

  private obj;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ngOnInit() {
    this.obj = [
      { title: "SEA 官网", icon: "", value: "https://otcgo.cn" },
      { title: "SEA 微信客服 1", icon: "", value: "Andre_1119" },
      { title: "SEA 微信客服 2", icon: "", value: "LINCHEN2645614" },
      { title: "SEA QQ 客服 1", icon: "", value: "398974686" },
      { title: "SEA QQ 客服 2", icon: "", value: "649027008" },
      { title: "SEA Telegram", icon: "", value: "t.me/otcgo" }
    ]
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad NodeRulePage');
  }

}
