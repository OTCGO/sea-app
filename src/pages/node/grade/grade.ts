import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the GradePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 // 等级页面
@IonicPage({
  name: 'Grade',
  segment: 'grade'
})
@Component({
  selector: 'page-grade',
  templateUrl: 'grade.html',
})
export class GradePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GradePage');
  }

}
