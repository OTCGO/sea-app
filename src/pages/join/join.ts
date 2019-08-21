import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

/**
 * Generated class for the JoinPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'Join',
  segment: 'join'
})
@Component({
  selector: 'page-join',
  templateUrl: 'join.html',
})
export class JoinPage {
  private fp: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder) {
    this.fp = this.formBuilder.group({
      cycle: ['f']
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad JoinPage');
  }

}
