import { Component, ViewChild, ComponentFactoryResolver, OnInit, OnDestroy, ViewContainerRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MenuService, NodeService } from '../../../shared/services'
import { NodeSelectors, BonusSelectors } from '../../../store/selectors'
import { Store } from '@ngrx/store'
import { RootState } from '../../../store/reducers'
import { Bonus } from '@shared/models';
import { SuccessAlertComponent } from '../../../components/success-alert/success-alert';

/**
 * Generated class for the NodePickPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'NodePick',
  segment: 'pick'
})
@Component({
  selector: 'page-node-pick',
  templateUrl: 'node-pick.html',
})
export class NodePickPage implements OnInit {
  private bonus = {
    total: '',
  }

  private total
  private available
  private fee
  private withdraw_actually
  private pwd

  @ViewChild("alertContainer", { read: ViewContainerRef }) container: ViewContainerRef;

  constructor(public navCtrl: NavController,
    private store: Store<RootState>,
    public navParams: NavParams,
    public nodeService: NodeService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private menuService: MenuService) {
  }
  ngOnInit() {

    this.store.select(BonusSelectors.getEntities).subscribe(bonus => {
      if (bonus) {
        console.log('bonus', bonus)
        // this.total = parseInt(bonus.total)
        this.total = bonus.total

        this.available = bonus.withdraw_max
        this.withdraw_actually = bonus.withdraw_actually

        this.fee = parseFloat(bonus.fee) * 100 + '%'
        // this.bonus = bonus
      }
    })
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad NodePickPage');
  }

  handleMenu() {
    console.log('handleMenu')
    this.menuService.sendMessage("change")
  }

  Notification(content: any[]) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(SuccessAlertComponent)
    const componentRef = this.container.createComponent(componentFactory);

    componentRef.instance.title = content[0]
    componentRef.instance.result = content[1]
    componentRef.instance.reason = content[2]
    componentRef.instance.icon = content[3]
  }



  async btnPick() {
    try {
      // console.log('btnPick', this.pwd)
      const result: any = await this.nodeService.withdraw(this.pwd);
      this.Notification(["提取", "操作成功", `本次提取${this.withdraw_actually}`, 1])

      // if (result.code === 200) {
      //   // console.log('签到成功')


      // } else {
      //   this.Notification(["解锁", "操作失败", ``, 0])
      // }

    } catch (error) {
      console.log('btnPick', error)

      this.Notification(["提取", "操作失败", `${error.message}`, 0])
    }
  }
}
