import { Component, Input, OnInit } from '@angular/core';
import { MenuService } from '../../shared/services'
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Store } from '@ngrx/store'
import { RootState } from '../../store/reducers'
import { BalancesSelectors, NodeSelectors, WalletSelectors, BonusSelectors } from '../../store/selectors'
import { BalancesActions, NodeActions, BonusActions } from '../../store/actions'

/**
 * Generated class for the NodeMenuComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'node-menu',
  templateUrl: 'node-menu.html'

})
export class NodeMenuComponent implements OnInit {
  private display: Boolean
  private nodeLevel

  private isMenu: boolean;

  constructor(
    public navCtrl: NavController,
    private store: Store<RootState>,
    private menuService: MenuService) {

  }

  ngOnChanges() {
    // console.log('ngOnChanges')
  }

  ngDoCheck() {
    // console.log('ngDoCheck')

    this.store.select(NodeSelectors.getEntities).subscribe(async node => {
      if (node && node.status >= 0) {
        this.isMenu = true
      } else {
        this.isMenu = false
      }
    })
  }

  ngOnInit() {

    this.menuService.getMessage().subscribe(data => {
      console.log('NodeMenuComponent', data)
      this.display = !this.display
      // this.display = true;
    })

    this.store.select(NodeSelectors.getEntities).subscribe(async node => {
      if (node && node.nodelevel && node.status >= 0) {
        this.nodeLevel = node.nodelevel

        // console.log('444', !node.nodelevel || node.code === -7)
        // if (!node.nodelevel || node.code === -7) {
        //   this.isMenu = false
        // } else {
        //   this.isMenu = true
        // }
      }
    })

  }

  goPage(name) {
    this.menuService.sendMessage("change")
    this.navCtrl.push(name)
  }

  handleMenu() {
    this.menuService.sendMessage("change")
  }
}
