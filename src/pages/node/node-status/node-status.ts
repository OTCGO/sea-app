import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MenuService } from '../../../shared/services'
import { NodeService } from '../../../shared/services'
import { Store } from '@ngrx/store'
import { RootState } from '../../../store/reducers'
import { BonusSelectors, NodeSelectors } from '../../../store/selectors'
import { BonusActions, NodeActions } from '../../../store/actions'
import { Bonus } from '@shared/models';


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
export class NodeStatusPage implements OnInit {
  private node
  private bonus: Bonus = {
    total: '',
    withdraw_actually: '',
    fee: '',
    withdraw_max: '',
    remain: '',
    history: [
      {
        "lockedbonus": '',
        "teambonus": '',
        "signinbonus": '',
        "amount": '',
        "total": '',
        "remain": '',
        "bonustime": '',
      }
    ]
  }

  constructor(public navCtrl: NavController,
    private store: Store<RootState>,
    public navParams: NavParams,
    public nodeService: NodeService,
    private menuService: MenuService) {
  }

  ngOnInit() {
    this.loadBonus()
  }

  loadBonus() {
    this.store.dispatch(new BonusActions.Load())

    this.store.select(NodeSelectors.getEntities).subscribe(node => {
      if (node) this.node = node
    })

    this.store.select(BonusSelectors.getEntities).subscribe(bonus => {
      if (bonus) {
        console.log('bonus', bonus)
        this.bonus = bonus
      }
    })
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

  gotoBalance() {
    this.navCtrl.push("Balance")
  }
}
