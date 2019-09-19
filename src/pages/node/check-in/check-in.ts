import { Component, ViewChild, ComponentFactoryResolver, OnInit, OnDestroy, ViewContainerRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AdDirective } from '../../../directive/ad.directive';
import { NodeMenuComponent } from '../../../components/node-menu/node-menu';


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
  private year;
  private moth;
  private nday;
  private currentArr: Array<string> = [];
  // @ViewChild(AdDirective) adHost: AdDirective;
  @ViewChild("alertContainer", { read: ViewContainerRef }) container: ViewContainerRef;


  ngOnInit() {

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(NodeMenuComponent)

    //const viewContainerRef = this.adHost.viewContainerRef;
    //const viewContainerRef = this.container;;
    // viewContainerRef.clear();
    this.container.createComponent(componentFactory);

    //  const componentRef = viewContainerRef.createComponent(componentFactory);

  }

  ngOnDestroy() {

  }




  constructor(public navCtrl: NavController, public navParams: NavParams,
    private componentFactoryResolver: ComponentFactoryResolver) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckInPage');
    const data = new Date();//获取时间对象
    this.year = data.getFullYear();//当前年份
    this.moth = data.getMonth();//当前月份
    this.nday = data.getDate();//天

    this.calendar()
  }

  private calendar() {

    const nlstr = new Date(this.year, this.moth, 1);//获取每月的第一天 nlstr.getday()每月第一天是周几
    const day = new Array("周日", "周一", "周二", "周三", "周四", "周五", "周六");//固定每周

    const days = new Array(31, 28 + this.is_leap(this.year), 31, 30, 31, 31, 30, 31, 30, 31, 30, 31);


    console.log('calendar:nlstr', nlstr)
    const firstDay = nlstr.getDay()

    for (let i = 0; i < firstDay; i++) {
      this.currentArr.push('')
    }


    for (let i = 0; i < days[this.moth]; i++) {

      this.currentArr.push((i + 1).toString())

    }

    for (let i = 0; i < this.currentArr.length % 7; i++) {
      this.currentArr.push('')
    }






    // console.log('this.currentArr', this.currentArr)

    // console.log('calendar', nlstr.getDay())
  }

  private is_leap(year) {  //判断是否为闰年
    if (((year % 4) == 0) && ((year % 100) != 0) || ((year % 400) == 0)) {
      return 1;
    } else { return 0; }

  }

}
