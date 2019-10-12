import { Component, ViewChild, ComponentFactoryResolver, OnInit, OnDestroy, ViewContainerRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AdDirective } from '../../../directive/ad.directive';
import { NodeMenuComponent } from '../../../components/node-menu/node-menu';
import { NodeService } from '../../../shared/services'
import { Store } from '@ngrx/store'
import { RootState } from '../../../store/reducers'
import { SigninSelectors, WalletSelectors } from '../../../store/selectors'
import { NodeActions } from '../../../store/actions'
import { Signin } from '@shared/models';
import { SuccessAlertComponent } from '../../../components/success-alert/success-alert';

/**
 * Generated class for the CheckInPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'CheckIn',
  segment: 'check-in'
})
@Component({
  selector: 'page-check-in',
  templateUrl: 'check-in.html',
})
export class CheckInPage implements OnInit, OnDestroy {
  // private data;
  private currentDate = new Date()
  private year;
  private moth;
  private nday;
  private wif;
  private currentArr: Array<any> = [];
  // @ViewChild(AdDirective) adHost: AdDirective;

  private signArr;
  private signin: Signin = {
    total: '0',
    bonus: '0',
    status: 0,
    history: [0]
  };

  private signinText = '签到'

  @ViewChild("alertContainer", { read: ViewContainerRef }) container: ViewContainerRef;


  ngOnInit() {
    this.store.dispatch(new NodeActions.Signin())

    this.store.select(SigninSelectors.getEntities).subscribe(result => {
      console.log('SigninSelectors', result)
      if (result) {
        this.signin = result
        this.signArr = result.history


        if (result.status === 0) {
          this.signinText = '签到'
        }
        else if (result.status === 1) {
          this.signinText = '已签到'
        }

        else {
          this.signinText = '处理中'
        }



        console.log('this.signinText', result.status)
        console.log('this.signinText', this.signinText)
        this.calendar()
      }
    })


    this.store.select(WalletSelectors.getWif).subscribe(result => {
      console.log('WalletSelectors', result.wif)
      if (result) {
        this.wif = result.wif
      }
    })







  }

  ngOnDestroy() {

  }




  constructor(public navCtrl: NavController, public navParams: NavParams,
    private nodeService: NodeService,
    private store: Store<RootState>,
    private componentFactoryResolver: ComponentFactoryResolver) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckInPage');
    const data = new Date();//获取时间对象
    this.year = data.getFullYear();//当前年份
    this.moth = data.getMonth();//当前月份
    this.nday = data.getDate();//天


  }

  private calendar() {

    const nlstr = new Date(this.year, this.moth, 1);//获取每月的第一天 nlstr.getday()每月第一天是周几
    const day = new Array("周日", "周一", "周二", "周三", "周四", "周五", "周六");//固定每周

    const days = new Array(31, 28 + this.is_leap(this.year), 31, 30, 31, 31, 30, 31, 30, 31, 30, 31);


    console.log('calendar:nlstr', nlstr)
    const firstDay = nlstr.getDay()

    for (let i = 0; i < firstDay; i++) {
      this.currentArr.push({
        value: '',
        sign: false
      })
    }


    for (let i = 0; i < days[this.moth]; i++) {
      if (this.signArr.indexOf(i + 1) > -1) {
        this.currentArr.push({
          value: (i + 1).toString(),
          sign: true
        })
      } else {
        this.currentArr.push({
          value: (i + 1).toString(),
          sign: false
        })
      }



    }

    for (let i = 0; i < this.currentArr.length % 7; i++) {
      this.currentArr.push({
        value: '',
        sign: false
      })
    }






    console.log('this.currentArr', this.currentArr)

    // console.log('calendar', nlstr.getDay())
  }

  private is_leap(year) {  //判断是否为闰年
    if (((year % 4) == 0) && ((year % 100) != 0) || ((year % 400) == 0)) {
      return 1;
    } else { return 0; }

  }


  Notification(content: any[]) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(SuccessAlertComponent)
    const componentRef = this.container.createComponent(componentFactory);

    componentRef.instance.title = content[0]
    componentRef.instance.result = content[1]
    componentRef.instance.reason = content[2]
    componentRef.instance.icon = content[3]
  }


  async btnSignin() {
    console.log('signin', this.wif)

    if (this.signin.status === 0) {
      try {
        const result: any = await this.nodeService.signin(this.wif)
        console.log('result', result)

        this.Notification(["签到", "签到成功", ``, 1])
        this.signinText = '已签到';
        this.signin.status = 1;


      } catch (error) {
        console.log('签到失败', error)
        this.Notification(["签到", "签到失败", `${error.message}`, 0])
      }
    }
  }

}
