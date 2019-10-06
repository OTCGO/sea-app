import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Store } from '@ngrx/store'
import { RootState } from '../../../store/reducers'
import { BalancesSelectors, NodeSelectors, WalletSelectors, BonusSelectors } from '../../../store/selectors'

/**
 * Generated class for the BalancePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'Balance',
  segment: 'balance'
})

@Component({
  selector: 'page-balance',
  templateUrl: 'balance.html',
})
export class BalancePage implements OnInit {
  private node;
  constructor(public navCtrl: NavController,
    private store: Store<RootState>,
    public navParams: NavParams) {
  }

  ngOnInit() {
    this.store.select(NodeSelectors.getEntities).subscribe(node => {
      console.log('node:ngOnInit:node', node)
      if (node && node.nodelevel) {

        this.node = node

      }
    })
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad BalancePage');
  }

}
