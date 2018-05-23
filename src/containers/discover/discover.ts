import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage({
  name: 'Discover',
  segment: 'discover'
})
@Component({
  selector: 'page-discover',
  templateUrl: 'discover.html',
})
export class DiscoverPage {
  user: object;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

}
