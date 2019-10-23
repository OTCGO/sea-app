import { Component, ViewChild, ComponentFactoryResolver, OnInit, OnDestroy, ViewContainerRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MenuService, NodeService } from '../../../shared/services'
import { Store } from '@ngrx/store'
import { RootState } from '../../../store/reducers'
import { BalancesSelectors, NodeSelectors, WalletSelectors } from '../../../store/selectors'
import { BalancesActions, NodeActions } from '../../../store/actions'
import { NotificationProvider } from '../../../providers'
import { SuccessAlertComponent } from '../../../components/success-alert/success-alert';
import { isAddress } from '../../../shared/utils'

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
export class JoinPage implements OnInit {
  private fp: FormGroup;
  private gasBalance;
  private isAddress = false;
  private isAgree = false;
  private inputType = true
  private pwdType = 'password'

  @ViewChild("alertContainer", { read: ViewContainerRef }) container: ViewContainerRef;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private componentFactoryResolver: ComponentFactoryResolver,
    private nodeService: NodeService,
    private formBuilder: FormBuilder,
    private store: Store<RootState>,
    public notificationProvider: NotificationProvider,
    private menuService: MenuService) {
    this.fp = this.formBuilder.group({
      referrer: ['', [Validators.required], [this.addressValidator.bind(this)]],
      cycle: ['30'],
      amount: ['1000'],
      isAgree: [false, [Validators.required], [this.agreeValidator.bind(this)]],
      pwd: ['', [Validators.required]]
    });
  }

  async addressValidator(addressCtrl: FormControl) {
    const { value } = addressCtrl
    console.log('addressValidator', value)
    console.log('addressValidator', this.isAddress)
    if (isAddress(value)) {
      this.isAddress = true
      return
    }

    this.isAddress = false

  }

  async agreeValidator(addressCtrl: FormControl) {
    const { value } = addressCtrl
    console.log('agreeValidator', value)
    console.log('agreeValidator', this.isAgree)
    if (value) {
      this.isAgree = true

      return
    }

    this.isAgree = false

  }

  ngOnInit() {
    this.store.dispatch(new BalancesActions.Load())
    this.store.select(BalancesSelectors.getGasBalance).subscribe(balance => {
      // console.log('getSeacBalance:ngOnInit', balance)
      if (balance) {
        this.gasBalance = balance.amount || '0';
      }

    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad JoinPage');
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

  async submitJoin() {
    try {
      console.log('submitJoin')
      // if (parseFloat(this.gasBalance) < 0.01) {
      //   // gas balance not enough
      //   // return new
      //   console.log('gasBalance no enough')
      // }

      // check isAgree
      if (!this.fp.get('isAgree')) {
        console.log('isAgree')
      }

      const body = {
        referrer: this.fp.get('referrer').value,
        amount: this.fp.get('amount').value,
        days: this.fp.get('cycle').value,
      }

      console.log('submitJoin:body', body)

      const result: any = await this.nodeService.insert(body, this.fp.get('pwd').value)

      this.store.dispatch(new NodeActions.Load())
      this.Notification(["加入", "加入成功", ``, 1, 1])


      // if (result.code === 200) {
      //   // console.log('签到成功')


      // }
      // else {
      //   this.Notification(["加入", "加入失败", ``, 0])
      // }

    } catch (error) {
      console.log('error', error)
      this.Notification(["解锁", "操作失败", `${error.message}`, 0])
    }





  }
  displayPwd() {
    console.log('displayPwd')
    this.inputType = !this.inputType

    this.pwdType === 'password' ? this.pwdType = 'text' : this.pwdType = 'password';

  }

  updateAgree() {
    if (this.isAgree) {
      this.navCtrl.push('NodeRule')
    }

  }

}
