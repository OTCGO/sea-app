import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Store } from '@ngrx/store'
import { RootState } from '../../../store/reducers'
import { BalancesSelectors, NodeSelectors, WalletSelectors, BonusSelectors } from '../../../store/selectors'

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
export class GradePage implements OnInit {
  // private node
  private bgpath

  constructor(public navCtrl: NavController,
    private store: Store<RootState>,
    public navParams: NavParams) {
  }

  ngOnInit() {
    this.store.select(NodeSelectors.getEntities).subscribe(node => {
      console.log('node:ngOnInit:node', node)
      if (node && node.nodelevel) {
        this.bgpath = `https://otcgo.cn/static/node/${node.nodelevel}.png`
      }
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GradePage');
  }

}
