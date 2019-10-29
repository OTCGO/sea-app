import { Component, ViewChild, ComponentFactoryResolver, OnInit, OnDestroy, ViewContainerRef } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { MenuService, NodeService } from '../../../shared/services'
import { SuccessAlertComponent } from '../../../components/success-alert/success-alert';
import { Store } from '@ngrx/store'
import { RootState } from '../../../store/reducers'
import { BonusSelectors, NodeSelectors } from '../../../store/selectors'
import { BonusActions, NodeActions } from '../../../store/actions'

/**
 * Generated class for the NodeUnlockPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'NodeUnlock',
  segment: 'unlock'
})
@Component({
  selector: 'page-node-unlock',
  templateUrl: 'node-unlock.html',
})
export class NodeUnlockPage implements OnInit {


  @ViewChild("alertContainer", { read: ViewContainerRef }) container: ViewContainerRef;

  private pwd;
  private node;
  private inputType = true
  private pwdType = 'password'


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public nodeService: NodeService,
    private loadingCtrl: LoadingController,
    private store: Store<RootState>,
    private componentFactoryResolver: ComponentFactoryResolver,
    private menuService: MenuService) {
  }

  ngOnInit() {
    // check is join
    this.store.select(NodeSelectors.getEntities).subscribe(node => {


      console.log('node:ngOnInit:node', node)
      if (node && node.nodelevel) {
        this.store.dispatch(new BonusActions.Load())

        this.store.select(NodeSelectors.getEntities).subscribe(node => {
          if (node) {
            console.log('node', node)
            this.node = node
          }


        })

        this.node = node
      }


    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NodeUnlockPage');
  }

  handleMenu() {
    this.menuService.sendMessage("change")
  }


  Notification(content: any[]) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(SuccessAlertComponent)
    const componentRef = this.container.createComponent(componentFactory);

    componentRef.instance.title = content[0]
    componentRef.instance.result = content[1]
    componentRef.instance.reason = content[2]
    componentRef.instance.icon = content[3]
    componentRef.instance.isHome = content[4] || false
  }


  async btnUnlock() {
    try {
      console.log('btnPick', this.pwd)
      if (!this.pwd) {
        return
      }

      await this.showLoading();
      const result: any = await this.nodeService.unlock(this.pwd);

      this.store.dispatch(new NodeActions.Load())
      this.Notification(["解锁", "操作成功", ``, 1, 1])


    } catch (error) {
      console.log('btnUnlock', error)

      this.Notification(["解锁", "操作失败", `${error.message}`, 0])
    }


  }


  async showLoading() {
    const alert = this.loadingCtrl.create()
    await alert.present()

    setTimeout(() => {
      alert.dismiss().catch(() => { })
    }, 500)
  }

  displayPwd() {
    console.log('displayPwd')
    this.inputType = !this.inputType

    this.pwdType === 'password' ? this.pwdType = 'text' : this.pwdType = 'password';

  }
}
